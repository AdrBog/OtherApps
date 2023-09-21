document.getElementById("create-app").insertAdjacentHTML("afterend", "" + "<span class='subtitle'>Create app</span> <br>" + "Quickly create an application based on this table. <br><br>" + "<label for='table-app'>Table name:</label><input type='text' name='table-app' id='table-app'> <br> <br>" + "<button class='primary wide' onclick='askAppName()'>Create app</button><hr>");

document.getElementById("create-app").remove();

function generateDatabaseApp(database, table) {
    const buttonStyle = "display: flex; width: 48px; height: 48px; justify-content: center; align-items: center; position: absolute; color: rgb(255, 255, 255); background-color: transparent; background-repeat: no-repeat; background-attachment: fixed; background-size: contain; border: 0px; border-radius: 10px; font-size: 44px; box-sizing: border-box; user-select: none; font-family: aurulent-sans-mono; background-image: none; text-align: center;";
    const titlebarStyle = "display: flex; width: 800px; height: 48px; position: absolute; transform: translate(0px, 0px); color: rgb(255, 255, 255); background-repeat: no-repeat; background-attachment: fixed; background-size: contain; font-size: 23px; box-sizing: border-box; user-select: none; background-color: rgb(56, 96, 178); white-space: pre; background-image: none; align-items: center;";
    const labelStyle = "display: inline; width: 768px; height: 400px; position: absolute; transform: translate(16px, 64px); color: rgb(0, 0, 0); background-repeat: no-repeat; background-attachment: fixed; background-size: contain; box-sizing: border-box; user-select: none; background-color: transparent; background-image: none; overflow:scroll;";
    var app = generateXMLApp("My App", "BrowseScreen1", "800", "480", version);
    var appRoot = app.getElementsByTagName("App")[0];
    var browseScreen = generateXMLScreen(app, "BrowseScreen1", "gotoDetail = function (id){\n\tdataId = id;\n\tnavigate(\"DetailScreen1\");\n}\n\ngotoEdit = function (id, n){\n\tdataId = id;\n\tisNew = n;\n\tnavigate(\"EditScreen1\");\n}\n\nrefreshGallery = async function () {\n\tconst data = await sqljson(\"" + database + "\", \"" + table + "\");\n\t_BrowseGallery1.innerHTML = \"\";\n\tArray.from(data[\"items\"]).forEach((row) => {\n\t\tArray.from(data[\"columns_names\"]).forEach((col) => {\n\t\t\t_BrowseGallery1.innerHTML += col + \": \" + row[col] + \"<br>\";\n\t\t})\n\t\t_BrowseGallery1.innerHTML += \"<a href='#' onclick='gotoDetail(\\\"\" + row['id'] + \"\\\")'>Details</a> \";\n\t\t_BrowseGallery1.innerHTML += \"<a href='#' onclick='gotoEdit(\\\"\" + row['id'] + \"\\\", false)'>Edit Entry</a> \";\n\t\t_BrowseGallery1.innerHTML += \"<hr>\";\n\t})\n}\n\nrefreshGallery();");
    var detailScreen = generateXMLScreen(app, "DetailScreen1", "async function loadDetails(id){\n\t_DetailForm1.innerHTML = \"\";\n\tconst data = await sqljson(\"" + database + "\", \"" + table+ "\", \"WHERE id = \" + id);\n\tArray.from(data[\"columns_names\"]).forEach((col) => {\n\t\t_DetailForm1.innerHTML += col + \": \" + data[\"items\"][0][col] + \"<br>\";\n\t})\n}\n\nloadDetails(dataId);");
    var editScreen = generateXMLScreen(app, "EditScreen1", "async function loadInputs(id){\n\t_EditForm1.innerHTML = \"\";\n\tconst data = await sqljson(\"" + database + "\", \"" + table+ "\", \"WHERE id = \" + id);\n\tArray.from(data[\"columns_names\"]).forEach((col) => {\n\t\tif (/id/.test(col)){\n\t\t\treturn;\n\t\t}\n\t\t_EditForm1.innerHTML += \"<label for='col_\" + col + \"'>\" + col + \"</label>:<br>\";\n\t\tswitch(data[\"columns_types\"][col]){\n\t\t\tcase \"LONGTEXT\":\n\t\t\t\t_EditForm1.innerHTML += \"<textarea id='col_\" + col + \"' class='themed-blue'></textarea><br>\";\n\t\t\t\tbreak;\n\t\t\tcase \"REAL\":\n\t\t\tcase \"INTEGER\":\n\t\t\t\t_EditForm1.innerHTML += \"<input id='col_\" + col + \"' type='number' class='themed-blue'></input><br>\";\n\t\t\t\tbreak;\n\t\t\tcase \"TIMESTAMP\":\n\t\t\t\t_EditForm1.innerHTML += \"<input id='col_\" + col + \"' type='date' class='themed-blue'></input><br>\";\n\t\t\t\tbreak;\n\t\t\tdefault:\n\t\t\t\t_EditForm1.innerHTML += \"<input id='col_\" + col + \"' type='text' class='themed-blue'></input><br>\";\n\t\t\t\tbreak;\n\t\t}\n\t})\n\tif (isNew){\n\t\t_LblAppName3.innerText = \"        New Entry\";\n\t} else {\n\t\t_LblAppName3.innerText = \"        Edit Entry\";\n\t\tArray.from(_EditForm1.querySelectorAll(\"label\")).forEach((col) => {\n\t\t\tdocument.getElementById(\"col_\" + col.innerText).value = data[\"items\"][0][col.innerText];\n\t\t})\n\t}\n}\n\nloadInputs(dataId);");
    appRoot.appendChild(browseScreen);
    appRoot.appendChild(detailScreen);
    appRoot.appendChild(editScreen);

    browseScreen.appendChild(generateXMLChildren(app, "Label", "LblAppName1", "  " + database + "_" + table, 0, 0, "", titlebarStyle));
    browseScreen.appendChild(generateXMLChildren(app, "Button", "Refresh", "󰑐", 704, 0, "refreshGallery();", buttonStyle + "transform: translate(704px, 0px);"));
    browseScreen.appendChild(generateXMLChildren(app, "Button", "Plus", "󰐕", 752, 0, "gotoEdit(0, true);", buttonStyle + "transform: translate(752px, 0px);"));
    browseScreen.appendChild(generateXMLChildren(app, "Label", "BrowseGallery1", "", 16, 64, "", labelStyle + "font-size: 15px;"));

    detailScreen.appendChild(generateXMLChildren(app, "Label", "LblAppName2", "         Details", 0, 0, "", titlebarStyle));
    detailScreen.appendChild(generateXMLChildren(app, "Button", "Back", "󰁍", 0, 0, "navigate('BrowseScreen1');", buttonStyle + "transform: translate(0px, 0px);"));
    detailScreen.appendChild(generateXMLChildren(app, "Label", "DetailForm1", "", 16, 64, "", labelStyle + "font-size: 23px;"));

    editScreen.appendChild(generateXMLChildren(app, "Label", "LblAppName3", "", 0, 0, "", titlebarStyle));
    editScreen.appendChild(generateXMLChildren(app, "Button", "Back_1", "󰁍", 0, 0, "navigate('BrowseScreen1');", buttonStyle + "transform: translate(0px, 0px);"));
    editScreen.appendChild(generateXMLChildren(app, "Button", "Delete", "", 704, 0, "async function removeEntry(id){\n\tawait sqlquery(\"" + database + "\", \"DELETE from " + table+ " WHERE id = \" + id);\n\tnavigate(\"BrowseScreen1\");\n}\n\nif(confirm(\"Are you sure you want to delete this entry?\")){\n\tremoveEntry(dataId);\n}", buttonStyle + "transform: translate(704px, 0px);"));
    editScreen.appendChild(generateXMLChildren(app, "Button", "Save", "", 752, 0, "async function exeQuery(id) {\n\tlet cmd = \"\";\n\tif (isNew) {\n\t\tcmd += \"INSERT INTO " + table+ "(\";\n\t\tfor (const col of _EditForm1.querySelectorAll(\"label\")) cmd += col.innerText + \", \";\n\t\tcmd = cmd.slice(0, -2) + \") VALUES( \";\n\t\tfor (const col of _EditForm1.querySelectorAll(\"label\")) cmd += \"'\" + document.getElementById(\"col_\" + col.innerText).value + \"', \";\n\t\tcmd = cmd.slice(0, -2) + \");\";\n\t\tawait sqlquery(\"" + database + "\", cmd);\n\t\tnavigate(\"BrowseScreen1\");\n\t} else {\n\t\tcmd += \"UPDATE " + table+ " SET \";\n\t\tfor (const col of _EditForm1.querySelectorAll(\"label\")) cmd += col.innerText + \" = '\" + document.getElementById(\"col_\" + col.innerText).value + \"', \";\n\t\tcmd = cmd.slice(0, -2) + \" WHERE id = \" + id + \";\";\n\t\tawait sqlquery(\"" + database + "\", cmd);\n\t\tnavigate(\"BrowseScreen1\");\n\t}\n}\nexeQuery(dataId);", buttonStyle + "transform: translate(752px, 0px);"));
    editScreen.appendChild(generateXMLChildren(app, "Label", "EditForm1", "", 16, 64, "", labelStyle + "font-size: 15px;"));

    return new XMLSerializer().serializeToString(app);
}

function askAppName() {
    valid_name.lastIndex = 0;
    table_name = prompt("Enter the name of your app. Make sure it doesn't exist");
    cancel = false;
    if (!table_name) {
        alert("Can't create this app\nIt doesn't have a name")
    } else if (!valid_name.test(table_name)) {
        alert("Can't create this app\nIt contains special characters")
    } else {
        for (let x = 0; x < apps.length; x++) {
            if (apps[x] == table_name) {
                cancel = true;
                alert("Can't create " + table_name + "\nThis app already exists");
            }
        }
        if (!cancel) 
            createApp(tableApp.value, table_name);
        
    }
}

async function createApp(table, name) {
    const xmldata = generateDatabaseApp(database, table);
    const res = await fetch("/save", {
        method: "POST",
        body: JSON.stringify(
            {"id": name, "xmldata": xmldata, "screen": 1}
        ),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    const data = await res.json();
    alert("App created");
    window.open("/edit/" + name, "_blank");
}
