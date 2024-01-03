import os, shutil, sqlite3, json
from flask import Flask, render_template, request, jsonify, redirect, url_for
from flask_cors import CORS, cross_origin
from werkzeug.exceptions import abort
from xmlschema import XMLSchema, etree_tostring
from xml.dom import minidom
from settings import *

app = Flask(__name__)
CORS(app)
PROJECTS_DIR = "projects"
ADDONS_FILE = "addons.json"
VERSION = "0.5.0"

def reloadAddons():
    with open(f"{CONFIG_DIR}/{ADDONS_FILE}") as f:
        return json.load(f)

def loadXML(xml, xsd):
    schema = XMLSchema(xsd)
    data = schema.decode(xml)
    return data

def generateComponent():
    root = minidom.Document()
    xml = root.createElement("Component")
    screen = root.createElement("Screen")
    xml.setAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance")
    xml.setAttribute("xsi:noNamespaceSchemaLocation", "app.xsd")
    xml.setAttribute("displayname", "My Component")
    xml.setAttribute("defaultscreen", "Component")
    xml.setAttribute("OAVer", VERSION)
    screen.setAttribute("id", "Component")
    xml.appendChild(screen)
    root.appendChild(xml)
    return root.toprettyxml()

@app.route('/')
def index():
    addons = reloadAddons()
    reloadAddons()
    if not os.path.exists(f"{PROJECTS_DIR}"):
        os.makedirs(f"{PROJECTS_DIR}")
    if not os.path.exists(f"{CONFIG_DIR}/{CONFIG_FILE}"):
        setDefaultSettings()
    config.read(f"{CONFIG_DIR}/{CONFIG_FILE}")
    projects = os.listdir(f'{PROJECTS_DIR}/')
    return render_template('index.html', projects=projects, ver=VERSION, addons=addons["Index"], theme=config.get("Config", "theme"))

@app.route('/play/<id>/<component>')
def play(id, component):
    addons = reloadAddons()
    return render_template('play.html', id=id, component=component, addons=addons["Play"], theme=config.get("Config", "theme"))

@app.route('/embed/<id>/<component>')
def embed(id, component):
    addons = reloadAddons()
    s = request.args.get('s', type = str)
    return render_template('embed.html', id=id, component=component, addons=addons["Embed"])

@app.route('/edit/<id>')
def edit(id):
    addons = reloadAddons()
    c = request.args.get('c', default = '1', type = str)
    return render_template('edit.html', id=id, ver=VERSION, c=c, addons=addons["Editor"], theme=config.get("Config", "theme"))

@app.route('/appdata/<id>')
def appdata(id):
    c = request.args.get('c', default = '1', type = str)
    if not os.path.exists(f"{PROJECTS_DIR}/{id}/{c}.xml"):
        with open(f"{PROJECTS_DIR}/{id}/{c}.xml", "w") as component:
            component.write(generateComponent())
    return jsonify(loadXML(f"{PROJECTS_DIR}/{id}/{c}.xml", f"{PROJECTS_DIR}/{id}/app.xsd"))

@app.route('/remove/<id>')
def remove(id):
    shutil.rmtree(f'{PROJECTS_DIR}/{id}')
    return redirect("/", code=302)

@app.route('/save', methods=['GET', 'POST'])
def save():
    if request.method == 'POST':
        json = request.get_json()

        id = json['id']
        xmldata = json['xmldata']
        component = json['component']

        if not os.path.exists(f"{PROJECTS_DIR}/{id}"):
            os.makedirs(f"{PROJECTS_DIR}/{id}")
            shutil.copyfile(f"{CONFIG_DIR}/app.xsd", f"{PROJECTS_DIR}/{id}/app.xsd")

        with open(f'{PROJECTS_DIR}/{id}/{component}.xml', 'w') as file:
            file.write(xmldata)

        data = {'xmldata': xmldata}
        return jsonify(data)

@app.route('/settings', methods=('GET', 'POST'))
def settings():
    if request.method == "POST":
        for k, v in request.form.items():
            config.set("Config", k, v)
        with open(f"{CONFIG_DIR}/{CONFIG_FILE}", "w") as f:
            config.write(f)
    config.read(f"{CONFIG_DIR}/{CONFIG_FILE}")
    return render_template("settings.html", settings_info=SETTINGS, config=config["Config"], theme=config.get("Config", "theme"))

@app.route('/config/<optionName>', methods=('GET', 'POST'))
def configure(optionName):
    if request.method == 'GET':
        return config.get("Config", optionName)