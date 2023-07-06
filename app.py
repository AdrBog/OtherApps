import os, shutil
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    projects = os.listdir('templates/projects/')
    return render_template('index.html', projects=projects)

@app.route('/play/<id>/<screen>')
def play(id, screen):
    return render_template('play.html', id=id, screen=screen)

@app.route('/embed/<id>/<screen>')
def embed(id, screen):
    xml = "`"
    with open(f'templates/projects/{id}/{screen}.xml', 'r') as file:
        xml += file.read().replace('\n', '')
    xml += "`"
    return render_template('embed.html', id=id, xmlfile=xml)

@app.route('/edit/<id>')
def edit(id):
    xml = "`"
    with open(f'templates/projects/{id}/1.xml', 'r') as file:
        xml += file.read().replace('\n', '')
    xml += "`"
    return render_template('edit.html', id=id, xmlfile=xml)

@app.route('/remove/<id>')
def remove(id):
    shutil.rmtree(f'templates/projects/{id}')
    return render_template('remove.html', id=id)

@app.route('/save', methods=['GET', 'POST'])
def save():
    if request.method == 'POST':
        json = request.get_json()

        sid = json['id']
        xmldata = json['xmldata']
        screen = json['screen']

        if not os.path.exists(f"templates/projects/{sid}"):
            os.makedirs(f"templates/projects/{sid}")

        with open(f'templates/projects/{sid}/{screen}.xml', 'w') as file:
            file.write(xmldata)

        data = {'xmldata': xmldata}

        return jsonify(data)