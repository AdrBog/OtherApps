const VALID_NAME = /^[a-zA-Z0-9_]{1,50}$/g;
const VALID_CHARS = /[a-zA-Z0-9_]/g;
const DEFAULT_APP_CONFIG = {
    "displayname": "My App",
    "defaultscreen": "Screen0",
    "width": "800",
    "height": "480"
}
const DEFAULT_SCREEN_CONFIG = {
    "style": "background-color: #ffffff;",
    "onvisible": ""
}
const DEFAULT_BUTTON_CONFIG = {
    "type": "Button",
    "text": "Button",
    "x": "64",
    "y": "64",
    "onselect": "",
    "style": "width: 160px; height: 64px; transform: translate(64px, 64px); color: #fff; background-color: rgb(56, 96, 178); border: 2px solid rgba(0, 0, 0, 0.2); border-radius: 10px;"
}
const DEFAULT_LABEL_CONFIG = {
    "type": "Label",
    "text": "Text",
    "x": "64",
    "y": "64",
    "onselect": "",
    "style": "width: 160px; height: 64px; transform: translate(64px, 64px); color: #000;"
}

function generateXMLComponent(compConfig){
    const xmlDoc = document.implementation.createDocument(null, "Component");
    const pi = xmlDoc.createProcessingInstruction('xml', 'version="1.0" encoding="UTF-8"');
    const xmlDocRoot = xmlDoc.getElementsByTagName("Component")[0];
    xmlDoc.insertBefore(pi, xmlDoc.firstChild);
    xmlDocRoot.setAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
    xmlDocRoot.setAttribute("xsi:noNamespaceSchemaLocation", "app.xsd");
    for (const attr in compConfig)
        xmlDocRoot.setAttribute(attr, compConfig[attr]);
    return xmlDoc;
}

function generateXMLScreen(xmldoc, itemConfig){
    const screen = xmldoc.createElement("Screen");
    for (const prop in itemConfig){
        if (!/class|type|screen/.test(prop.toLowerCase()))
            if(!/onvisible|style/.test(prop.toLowerCase()))
                screen.setAttribute(prop.toLowerCase(), itemConfig[prop])
            else
                screen.setAttribute(prop.toLowerCase(), encodeURI(itemConfig[prop]).replace(/%20/g, " "))
    }
    return screen;
}

function generateXMLChildren(xmldoc, itemConfig){
    const children = xmldoc.createElement("Children");
    for (const prop in itemConfig){
        if (!/class/.test(prop.toLowerCase()))
            if(!/onselect|style|text/.test(prop.toLowerCase()))
                children.setAttribute(prop.toLowerCase(), itemConfig[prop])
            else
                children.setAttribute(prop.toLowerCase(), encodeURI(itemConfig[prop]).replace(/%20/g, " "))
    }
    return children;
}

async function getCompData(id, c = "1"){
    const res = await fetch("/appdata/" + id + "?c=" + c)
    const data = await res.json();
    return data;
}

function hex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(color){
    color = (!color || !color.startsWith("rgb")) ? "rgb(0, 0, 0)" : color;
    rgb = color.substring(4, color.length-1).replace(/ /g, '').split(',');
    r = Number(rgb[0]).toString(16);
    g = Number(rgb[1]).toString(16);
    b = Number(rgb[2]).toString(16);
    return "#" + hex(r) + hex(g) + hex(b);
}

/**
 * Read a value from the Other Apps config file
 * @param {*} optionName 
 * @returns 
 */
async function getOAConfig(optionName){
    const res = await fetch(`/config/${optionName}`);
    return await res.text();
}

async function saveComponent(id ,xmlData, component = 1){
    const res = fetch("/save", {
        method: "POST",
        body: JSON.stringify({
            "id": id,
            "xmldata": xmlData,
            "component" : component
        }),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    });
    const data = await res.json;
    return data;
}

function validateName(name){
    return name.match(VALID_CHARS).join("")
}

function isValid(text){
    VALID_NAME.lastIndex = 0;
    return VALID_NAME.test(text);
}

function getItemById(root, itemId){
    return root.querySelector(`[id='${itemId}']`)
}

function getAllItems(root){
    return root.querySelectorAll(":scope > div, :scope > div > div");
}

function getAllScreens(root){
    return root.querySelectorAll(":scope > div");
}

function getAllChildrens(screen){
    return screen.querySelectorAll(":scope > div");
}

function generateChildren(itemConfig, editable = false){
    let currentId = 0;
    const children = document.createElement("div");
    itemConfig["type"] = (itemConfig["type"]) ? itemConfig["type"] : "Label";
    while(document.getElementById(itemConfig["type"] + currentId) != null)
        currentId++;
    
    children.id = (itemConfig["id"]) ? validateName(itemConfig["id"]) : itemConfig["type"] + currentId;
    children.classList.add(itemConfig["type"], "Children");
    children.innerHTML = decodeURI(itemConfig["text"]);

    if (editable)
        children.setAttribute("OnSelect", itemConfig["onselect"]);
    else 
        children.setAttribute("onClick", `try {\n${itemConfig["onselect"]}\n} catch (error) {alert(error);} `);
    
    for (const prop in itemConfig)
        if (!/onselect|text/.test(prop))
            children.setAttribute(prop, itemConfig[prop]);

    return children;
}

function generateScreen(itemConfig, editable = false){
    let currentId = 0;
    const screen = document.createElement("div");
    while(document.getElementById("Screen" + currentId) != null)
        currentId++;
    screen.id = (itemConfig["id"]) ? validateName(itemConfig["id"]) : "Screen" + currentId;
    screen.classList.add("Screen");
    screen.setAttribute("type", "Screen");
    screen.setAttribute("screen", "");

    for (const prop in itemConfig)
        screen.setAttribute(prop, itemConfig[prop]);

    return screen;
}

function JSONtoItemConfig(json){
    let itemConfig = {};
    for (const key in json) {
        if(key.charAt(0) == "@")
            itemConfig[key.substring(1)] = decodeURI(json[key]);
        else if (typeof json[key] != "object")
            itemConfig[key] = json[key];
    }
    return itemConfig;
}

function generateApp(root, appData, editable = false){
    for (const screen of appData["Screen"]) {
        const screenDiv = generateScreen(JSONtoItemConfig(screen), editable);
        const childrenList = (("Children" in screen)) ? screen["Children"] : [];
        root.appendChild(screenDiv);
        for (const children of childrenList)
            screenDiv.appendChild(generateChildren(JSONtoItemConfig(children), editable));
    }
}

function getItemConfig (item) {
    return Array.from(item.attributes)
      .map(attribute => [attribute.name, attribute.value])
      .reduce((itemConfig, property) => {
        if (property[0] != "class")
            itemConfig[property[0]] = property[1];
        if (item.getAttribute("type") != "Screen")
            itemConfig["text"] = item.innerHTML;
        return itemConfig
      }, {})
  }

function insertScreen(root, itemConfig, editable = false){
    let screen = generateScreen(itemConfig, editable)
    root.appendChild(screen);
    return screen;
}

function insertChildren(screen, itemConfig, editable = false){
    let children = generateChildren(itemConfig, editable);
    screen.appendChild(children);
    return children;
}

function renameItem(root, item, newName){
    while(document.getElementById(newName) != null)
        newName = newName + "_1";
    item.id = newName;
    return item;
}