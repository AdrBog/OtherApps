const VALID_NAME = /^[a-zA-Z0-9_]{1,50}$/g;
const VALID_CHARS = /[a-zA-Z0-9_]/g;

function generateXMLApp(display_name, default_screen, w, h, version){
    const xmlDoc = document.implementation.createDocument(null, "App");
    const pi = xmlDoc.createProcessingInstruction('xml', 'version="1.0" encoding="UTF-8"');
    const xmlDocRoot = xmlDoc.getElementsByTagName("App")[0];
    xmlDoc.insertBefore(pi, xmlDoc.firstChild);
    xmlDocRoot.setAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
    xmlDocRoot.setAttribute("xsi:noNamespaceSchemaLocation", "app.xsd");
    xmlDocRoot.setAttribute("DisplayName", display_name);
    xmlDocRoot.setAttribute("DefaultScreen", default_screen);
    xmlDocRoot.setAttribute("Width", w);
    xmlDocRoot.setAttribute("Height", h);
    xmlDocRoot.setAttribute("OAVer", version);
    return xmlDoc;
}

function generateXMLScreen(xmldoc, name, on_visible = "", style = "background-color: rgb(255, 255, 255);"){
    const screen = xmldoc.createElement("Screen");
    screen.setAttribute("Name", name);
    screen.setAttribute("Style", encodeURI(style).replace(/%20/g, " "));
    screen.setAttribute("OnVisible", encodeURI(on_visible).replace(/%20/g, " "));
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
    const children = xmldoc.createElement("Children");
    children.setAttribute("Type", type);
    children.setAttribute("Name", name);
    children.setAttribute("Text", encodeURI(text).replace(/%20/g, " "));
    children.setAttribute("X", x);
    children.setAttribute("Y", y);
    children.setAttribute("OnSelect", encodeURI(on_select).replace(/%20/g, " "));
    children.setAttribute("Style", encodeURI(style).replace(/%20/g, " "));
    return children;
}

async function getAppData(id, c = "1"){
    const res = await fetch("/appdata/" + id + "?c=" + c)
    const data = await res.json();
    return data;
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

async function getConfig(attributeName){
    const res = await fetch("/json/config");
    const data = await res.json();
    return data[attributeName];
}

function validateName(name){
    return name.match(VALID_CHARS).join("")
}

function isValid(text){
    VALID_NAME.lastIndex = 0;
    return VALID_NAME.test(text);
}