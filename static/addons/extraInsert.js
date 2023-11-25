// Replace original label and button inserts
document.getElementById("a-label").setAttribute("onclick", "extraInsert('label')");
document.getElementById("a-button").setAttribute("onclick", "extraInsert('button')");

// This addon adds extra options to the insert button

document.getElementById("tool-bar-insert").innerHTML += '<hr>' +
    '<a href="#" onclick="extraInsert(\'iframe\')">Frame</a>' +
    '<hr>' +
    '<a href="#" onclick="extraInsert(\'plus\')">Plus Icon</a>' +
    '<a href="#" onclick="extraInsert(\'refresh\')">Refresh Icon</a>' +
    '<a href="#" onclick="extraInsert(\'back\')">Back Icon</a>' +
    '<a href="#" onclick="extraInsert(\'home\')">Home Icon</a>' +
    '<hr>' +
    '<a href="#" onclick="extraInsert(\'input\')">Input</a>' +
    '<a href="#" onclick="extraInsert(\'checkbox\')">Checkbox</a>' +
    '<a href="#" onclick="extraInsert(\'radio\')">Radio</a>' +
    '<a href="#" onclick="extraInsert(\'select\')">Select</a>';
    

function extraInsert(item) {
    switch (item) {
        case "label":
            newitemElement = editorInsertItem("label");
            newitemElement.style.backgroundColor = "transparent";
            newitemElement.style.whiteSpace = "pre";
            break;
        case "button":
            newitemElement = editorInsertItem("button");
            newitemElement.style.whiteSpace = "pre";
            break;
        case "plus":
            newitemElement = editorInsertItem("button");
            newitemElement.innerHTML = "󰐕";
            newitemElement.style.backgroundColor = "transparent";
            newitemElement.style.color = "#000";
            newitemElement.style.border = "0";
            newitemElement.style.width = "64px";
            newitemElement.style.height = "64px";
            newitemElement.style.fontFamily = "aurulent-sans-mono";
            newitemElement.style.fontSize = "60px";
            editorRenameItem(newitemElement, "Plus");
            break;
        case "refresh":
            newitemElement = editorInsertItem("button");
            newitemElement.innerHTML = "󰑐";
            newitemElement.style.backgroundColor = "transparent";
            newitemElement.style.color = "#000";
            newitemElement.style.border = "0";
            newitemElement.style.width = "64px";
            newitemElement.style.height = "64px";
            newitemElement.style.fontFamily = "aurulent-sans-mono";
            newitemElement.style.fontSize = "60px";
            editorRenameItem(newitemElement, "Refresh");
            break;
        case "back":
            newitemElement = editorInsertItem("button");
            newitemElement.innerHTML = "󰁍";
            newitemElement.style.backgroundColor = "transparent";
            newitemElement.style.color = "#000";
            newitemElement.style.border = "0";
            newitemElement.style.width = "64px";
            newitemElement.style.height = "64px";
            newitemElement.style.fontFamily = "aurulent-sans-mono";
            newitemElement.style.fontSize = "60px";
            newitemElement.setAttribute("OnSelect", "back()");
            editorRenameItem(newitemElement, "Back");
            break;
        case "home":
            newitemElement = editorInsertItem("button");
            newitemElement.innerHTML = "";
            newitemElement.style.backgroundColor = "transparent";
            newitemElement.style.color = "#000";
            newitemElement.style.border = "0";
            newitemElement.style.width = "64px";
            newitemElement.style.height = "64px";
            newitemElement.style.fontFamily = "aurulent-sans-mono";
            newitemElement.style.fontSize = "60px";
            editorRenameItem(newitemElement, "Home");
            break;
        case "iframe":
            newitemElement = editorInsertItem("label");
            newitemElement.style.width = "420px";
            newitemElement.style.height = "256px";
            newitemElement.innerHTML = "<iframe src='' style='flex: 1;'></iframe>";
            newitemElement.style.backgroundColor = "transparent";
            editorRenameItem(newitemElement, "Frame");
            break;
        case "input":
            newitemElement = editorInsertItem("label");
            newitemElement.style.width = "256px";
            newitemElement.style.height = "64px";
            newitemElement.style.display = "grid";
            newitemElement.style.overflow = "unset";
            newitemElement.style.backgroundColor = "transparent";
            newitemElement.innerHTML = "Text: <input type='text' class='themed-blue'>";
            editorRenameItem(newitemElement, "Input");
            break;
        case "checkbox":
            newitemElement = editorInsertItem("label");
            newitemElement.style.width = "128px";
            newitemElement.style.height = "64px";
            newitemElement.style.display = "block";
            newitemElement.style.overflow = "unset";
            newitemElement.style.backgroundColor = "transparent";
            newitemElement.innerHTML = "<input type='checkbox' class='themed-blue'> Checkbox";
            editorRenameItem(newitemElement, "Checkbox");
            break;
        case "radio":
            newitemElement = editorInsertItem("label");
            newitemElement.style.width = "128px";
            newitemElement.style.height = "128px";
            newitemElement.style.display = "block";
            newitemElement.style.overflow = "unset";
            newitemElement.style.backgroundColor = "transparent";
            newitemElement.innerHTML = "<input type='radio' name='radio-sample' class='themed-blue'>\n<span style='vertical-align: middle;'>Option 1</span><br>\n<input type='radio' name='radio-sample' class='themed-blue'>\n<span style='vertical-align: middle;'>Option 2</span>";
            editorRenameItem(newitemElement, "Radio");
            break;
        case "select":
            newitemElement = editorInsertItem("label");
            newitemElement.style.width = "256px";
            newitemElement.style.height = "64px";
            newitemElement.style.display = "grid";
            newitemElement.style.backgroundColor = "transparent";
            newitemElement.innerHTML = "Text: \n<select class='themed-blue'>\n\t<option value='A'>A</option>\n\t<option value='B'>B</option>\n\t<option value='C'>C</option>\n</select>";
            editorRenameItem(newitemElement, "Select");
            break;
    }
    clickItem(newitemElement);
}