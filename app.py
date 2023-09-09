import os, shutil, sqlite3, json
from flask import Flask, render_template, request, jsonify, redirect, url_for
from werkzeug.exceptions import abort

app = Flask(__name__)
projects_dir = "projects"
skel_dir = "static/skel"
version="0.24"

def get_db_connection(id):
    conn = sqlite3.connect(f'templates/databases/{id}/database.db')
    conn.row_factory = sqlite3.Row
    return conn

def get_item(id, table, item_id):
    conn = get_db_connection(id)
    item = conn.execute(f'SELECT * FROM {table} WHERE id = ?',
                        (item_id,)).fetchone()
    conn.close()
    if item is None:
        abort(404)
    return item

def get_columns_names(id, table):
    conn = get_db_connection(id)
    cursor = conn.execute(f'SELECT * FROM {table}')
    columnNames = list(map(lambda x: x[0], cursor.description))
    conn.close()
    return columnNames

def get_columns_types(id, table):
    conn = get_db_connection(id)
    columnsQuery = conn.execute(f"pragma table_info('{table}')")
    columnInfos = columnsQuery.fetchall()
    columnTypes = [item[2] for item in columnInfos]
    return columnTypes

@app.route('/')
def index():
    if not os.path.exists(f"{projects_dir}"):
        os.makedirs(f"{projects_dir}")
    if not os.path.exists(f"templates/databases"):
        os.makedirs(f"templates/databases")
    projects = os.listdir(f'{projects_dir}/')
    return render_template('index.html', projects=projects, ver=version)

@app.route('/play/<id>/<screen>')
def play(id, screen):
    return render_template('play.html', id=id, screen=screen)

@app.route('/embed/<id>/<screen>')
def embed(id, screen):
    s = request.args.get('s', type = str)
    with open(f'{projects_dir}/{id}/{screen}.xml', 'r') as file:
        xml = file.read().replace('\n', '')
    return render_template('embed.html', id=id, xmlfile=xml, s=s)

@app.route('/edit/<id>')
def edit(id):
    c = request.args.get('c', default = '1', type = str)
    try:
        with open(f'{projects_dir}/{id}/{c}.xml', 'r') as file:
            xml = file.read().replace('\n', '')
    except:
        xml = '<App DisplayName="Component" DefaultScreen="Screen0" Width="800" Height="480" OAVer="0.24"><Screen Name="Screen0" Style="position:%20relative;%20width:%20100%25;%20height:%20100%25;%20overflow:%20hidden;background-color:%20rgb(255,%20255,%20255);" OnVisible=""></Screen></App>'
    return render_template('edit.html', id=id, xmlfile=xml, ver=version, c=c)

@app.route('/remove/<id>')
def remove(id):
    shutil.rmtree(f'{projects_dir}/{id}')
    return redirect("/", code=302)

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


# DATABASES

@app.route('/database/menu')
def database_menu():
    databases = os.listdir(f'templates/databases')
    return render_template('datamenu.html', databases=databases)

@app.route('/database/info/<id>')
def database_info(id):
    path = os.path.abspath('templates/databases/' + id)
    with open(f'templates/databases/{id}/schema.sql', 'r') as file:
        schema = file.read().replace('\n', '\\n')
    conn = sqlite3.connect(f'templates/databases/{id}/database.db')
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    tables = json.dumps(tables)
    conn.close()
    projects = os.listdir(f'{projects_dir}/')
    return render_template('datainfo.html', id=id, path=path, schema=schema, tables=tables, projects=projects, ver=version)

@app.route('/database/list/<id>/<table>')
def database_list(id, table):
    conn = get_db_connection(id)
    table_data = conn.execute(f'SELECT * FROM {table}').fetchall()
    conn.close()
    return render_template(f'databases/{id}/list.html', id=id, table=table, table_data=table_data)

@app.route('/database/exec/<id>/', methods=('GET', 'POST'))
def database_exec(id):
    conn = get_db_connection(id)
    if request.method == 'POST':
        json = request.get_json()
        sql_query = f"""{json['final_command']}"""
        conn.executescript(sql_query)
        conn.commit()
    conn.close()
    return 'OK'

@app.route('/database/new/<id>')
def database_new(id):
    if not os.path.exists(f"templates/databases/{id}"):
        os.makedirs(f"templates/databases/{id}")
    shutil.copyfile(f"{skel_dir}/schema.sql", f"templates/databases/{id}/schema.sql")
    shutil.copyfile(f"{skel_dir}/new.html", f"templates/databases/{id}/new.html")
    shutil.copyfile(f"{skel_dir}/edit.html", f"templates/databases/{id}/edit.html")
    shutil.copyfile(f"{skel_dir}/preview.html", f"templates/databases/{id}/preview.html")
    shutil.copyfile(f"{skel_dir}/list.html", f"templates/databases/{id}/list.html")
    return redirect("/database/menu", code=302)

@app.route('/database/remove/<id>')
def database_remove(id):
    shutil.rmtree(f'templates/databases/{id}')
    return redirect("/database/menu", code=302)

@app.route('/database/preview/<id>/<table>/<item_id>')
def database_preview(id, table, item_id):
    item = get_item(id, table, item_id)
    return render_template(f'databases/{id}/preview.html', id=id, table=table, item=item, columns_names=get_columns_names(id, table), columns_types=get_columns_types(id, table), len=len(item))

@app.route('/database/new_item/<id>/<table>', methods=('GET', 'POST'))
def database_new_item(id, table):
    return render_template(f'databases/{id}/new.html', id=id, table=table, columns_names=get_columns_names(id, table), columns_types=get_columns_types(id, table))

@app.route('/database/edit_item/<id>/<table>/<item_id>', methods=('GET', 'POST'))
def database_edit_item(id, table, item_id):
    item = get_item(id, table, item_id)
    return render_template(f'databases/{id}/edit.html', id=id, table=table, item_id=item_id, item=item, columns_names=get_columns_names(id, table), columns_types=get_columns_types(id, table), len=len(item))