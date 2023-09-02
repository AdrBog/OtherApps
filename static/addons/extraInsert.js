// Replace original label and button inserts
document.getElementById("a-label").setAttribute("onclick", "extraInsert('label')");
document.getElementById("a-button").setAttribute("onclick", "extraInsert('button')");

// This addon adds extra options to the insert button

document.getElementById("tool-bar-insert").innerHTML += '<hr>' +
    '<a href="#" onclick="extraInsert(\'database\')">Database</a>' +
    '<hr>' +
    '<a href="#" onclick="extraInsert(\'plus\')">Plus Icon</a>' +
    '<a href="#" onclick="extraInsert(\'refresh\')">Refresh Icon</a>' +
    '<a href="#" onclick="extraInsert(\'back\')">Back Icon</a>' +
    '<a href="#" onclick="extraInsert(\'home\')">Home Icon</a>' +
    '<hr>' +
    '<a href="#" onclick="extraInsert(\'input\')">Input</a>' +
    '<a href="#" onclick="extraInsert(\'select\')">Select</a>';
    

function extraInsert(item) {
    switch (item) {
        case "label":
            newitemID = insert("label");
            newitemElement = document.getElementById(newitemID);
            newitemElement.style.backgroundColor = "transparent";
            newitemElement.style.whiteSpace = "pre";
            break;
        case "button":
            newitemID = insert("button");
            newitemElement = document.getElementById(newitemID);
            newitemElement.style.whiteSpace = "pre";
            break;
        case "plus":
            newitemID = insert("button");
            newitemElement = document.getElementById(newitemID);
            newitemElement.innerHTML = "󰐕";
            newitemElement.style.backgroundColor = "transparent";
            newitemElement.style.color = "#000";
            newitemElement.style.border = "0";
            newitemElement.style.width = "64px";
            newitemElement.style.height = "64px";
            newitemElement.style.fontFamily = "aurulent-sans-mono";
            newitemElement.style.fontSize = "60px";
            rename(newitemID, "Plus");
            break;
        case "refresh":
            newitemID = insert("button");
            newitemElement = document.getElementById(newitemID);
            newitemElement.innerHTML = "󰑐";
            newitemElement.style.backgroundColor = "transparent";
            newitemElement.style.color = "#000";
            newitemElement.style.border = "0";
            newitemElement.style.width = "64px";
            newitemElement.style.height = "64px";
            newitemElement.style.fontFamily = "aurulent-sans-mono";
            newitemElement.style.fontSize = "60px";
            rename(newitemID, "Refresh");
            break;
        case "back":
            newitemID = insert("button");
            newitemElement = document.getElementById(newitemID);
            newitemElement.innerHTML = "󰁍";
            newitemElement.style.backgroundColor = "transparent";
            newitemElement.style.color = "#000";
            newitemElement.style.border = "0";
            newitemElement.style.width = "64px";
            newitemElement.style.height = "64px";
            newitemElement.style.fontFamily = "aurulent-sans-mono";
            newitemElement.style.fontSize = "60px";
            rename(newitemID, "Back");
            break;
        case "home":
            newitemID = insert("button");
            newitemElement = document.getElementById(newitemID);
            newitemElement.innerHTML = "";
            newitemElement.style.backgroundColor = "transparent";
            newitemElement.style.color = "#000";
            newitemElement.style.border = "0";
            newitemElement.style.width = "64px";
            newitemElement.style.height = "64px";
            newitemElement.style.fontFamily = "aurulent-sans-mono";
            newitemElement.style.fontSize = "60px";
            rename(newitemID, "Home");
            break;
        case "database":
            database = prompt("Enter database name, look at database manager if you don't remember.");
            table = prompt("Enter table name, look at database manager if you don't remember.");
            if (!database || !table)
                break;
            newitemID = insert("label");
            newitemElement = document.getElementById(newitemID);
            newitemElement.style.width = "420px";
            newitemElement.style.height = "256px";
            newitemElement.innerHTML = "<span style='display:flex; margin: 32px; flex: 1;'>\n\t<iframe src='/database/list/" + database + "/" + table + "' style='flex: 1;'></iframe>\n</span>";
            rename(newitemID, "Database");
            break;
        case "input":
            newitemID = insert("label");
            newitemElement = document.getElementById(newitemID);
            newitemElement.style.width = "294px";
            newitemElement.style.height = "52px";
            newitemElement.style.display = "grid";
            newitemElement.innerHTML = "Text: <input type='text'>";
            rename(newitemID, "Input");
            break;
        case "select":
            newitemID = insert("label");
            newitemElement = document.getElementById(newitemID);
            newitemElement.style.width = "294px";
            newitemElement.style.height = "52px";
            newitemElement.style.display = "grid";
            newitemElement.innerHTML = "Text: \n<select>\n\t<option value='A'>A</option>\n\t<option value='B'>B</option>\n\t<option value='C'>C</option>\n</select>";
            rename(newitemID, "Select");
            break;

    }
}