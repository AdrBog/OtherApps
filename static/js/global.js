const valid_name = /^[a-zA-Z0-9_]{1,50}$/g;

function generateXMLApp(display_name, default_screen, w, h, version){
    var xmlDoc = document.implementation.createDocument(null, "App");
    var xmlDocRoot = xmlDoc.getElementsByTagName("App")[0];
    xmlDocRoot.setAttribute("DisplayName", display_name);
    xmlDocRoot.setAttribute("DefaultScreen", default_screen);
    xmlDocRoot.setAttribute("Width", w);
    xmlDocRoot.setAttribute("Height", h);
    xmlDocRoot.setAttribute("OAVer", version);
    return xmlDoc;
}

function generateXMLScreen(xmldoc, name, on_visible = "", style = "_def"){
    if (style == "_def"){
        style = "position: relative; width: 100%; height: 100%; overflow: hidden; background-color: rgb(255, 255, 255);";
    }
    var screen = xmldoc.createElement("Screen");
    screen.setAttribute("Name", name);
    screen.setAttribute("Style", encodeURI(style));
    screen.setAttribute("OnVisible", encodeURI(on_visible));
    return screen;
}

function generateXMLChildren(xmldoc, type, name, text, x = 64, y = 64, on_select = "", style = "_def"){
    if (style == "_def"){
        switch (type){
            case "Button":
                style = "display: flex; width: 160px; height: 64px; justify-content: center; align-items: center; position: absolute; transform: translate(" + x + "px, " + y + "px); color: rgb(255, 255, 255); background-color: rgb(56, 96, 178); background-repeat: no-repeat; background-attachment: fixed; background-size: contain; border: 2px solid rgba(0, 0, 0, 0.2); border-radius: 10px; font-size: 15px; box-sizing: border-box; user-select: none;";
                break;
            default:
                style = "display: flex; width: 160px; height: 64px; position: absolute; transform: translate(" + x + "px, " + y + "px); color: rgb(0, 0, 0); background-repeat: no-repeat; background-attachment: fixed; background-size: contain; font-size: 15px; box-sizing: border-box; user-select: none;";
                break;
        }
    }
    var children = xmldoc.createElement("Children");
    children.setAttribute("Type", type);
    children.setAttribute("Name", name);
    children.setAttribute("Text", encodeURI(text));
    children.setAttribute("X", x);
    children.setAttribute("Y", y);
    children.setAttribute("OnSelect", encodeURI(on_select));
    children.setAttribute("Style", encodeURI(style));
    return children;
}

function sql_execute(database, final_command){
    return new Promise((resolve) => fetch("/database/exec/" + database, {
        method: "POST",
        body: JSON.stringify({ "final_command": final_command }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(resolve));
}

function fix_color_format(color){
    rgb = color.substring(4, color.length-1).replace(/ /g, '').split(',');
    r = Number(rgb[0]).toString(16);
    g = Number(rgb[1]).toString(16);
    b = Number(rgb[2]).toString(16);
    return('#' + r + g + b);  
}