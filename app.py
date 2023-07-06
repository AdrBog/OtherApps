import os, shutil
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)
projects_dir = "projects"

@app.route('/')
def index():
    if not os.path.exists(f"{projects_dir}"):
        os.makedirs(f"{projects_dir}")
    projects = os.listdir(f'{projects_dir}/')
    return render_template('index.html', projects=projects)

@app.route('/play/<id>/<screen>')
def play(id, screen):
    return render_template('play.html', id=id, screen=screen)

@app.route('/embed/<id>/<screen>')
def embed(id, screen):
    xml = "`"
    with open(f'{projects_dir}/{id}/{screen}.xml', 'r') as file:
        xml += file.read().replace('\n', '')
    xml += "`"
    return render_template('embed.html', id=id, xmlfile=xml)

@app.route('/edit/<id>')
def edit(id):
    xml = "`"
    with open(f'{projects_dir}/{id}/1.xml', 'r') as file:
        xml += file.read().replace('\n', '')
    xml += "`"
    return render_template('edit.html', id=id, xmlfile=xml)

@app.route('/remove/<id>')
def remove(id):
    shutil.rmtree(f'{projects_dir}/{id}')
    return render_template('remove.html', id=id)

@app.route('/save', methods=['GET', 'POST'])
def save():
    if request.method == 'POST':
        json = request.get_json()

        sid = json['id']
        xmldata = json['xmldata']
        screen = json['screen']

        if not os.path.exists(f"{projects_dir}/{sid}"):
            os.makedirs(f"{projects_dir}/{sid}")

        with open(f'{projects_dir}/{sid}/{screen}.xml', 'w') as file:
            file.write(xmldata)

        data = {'xmldata': xmldata}

        return jsonify(data)
