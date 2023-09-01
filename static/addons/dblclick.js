function openEditor(textarea){
    textarea_selected = textarea;
    document.getElementById("editor-title").innerHTML = selected.getAttribute("id") + ' ' + textarea_selected.getAttribute("placeholder");
    aceEditor.setValue(textarea_selected.value);
    aceEditor.session.setMode("ace/mode/" + textarea_selected.getAttribute("mode"));
    aceEditor.focus();
    aceEditor.navigateFileStart();
    editorWindow.style.visibility = 'visible';
    can_click = false;
}

document.getElementById("virtual-screen").addEventListener('dblclick', (e) => {
    if (can_click)
        switch(selected.getAttribute("class").split(" ")[0]){
            case "Label":
                openEditor(document.getElementById("edit-info-text"));
                break;
            case "Button":
                openEditor(document.getElementById("edit-info-onclick"));
                break;
            case "Screen":
                openEditor(document.getElementById("edit-info-onvisible"));
                break;
        }
})