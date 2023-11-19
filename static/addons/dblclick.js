function openEditor(textarea){
    textarea_selectedItem = textarea;
    document.getElementById("editor-title").innerHTML = selectedItem.getAttribute("id") + ' ' + textarea_selectedItem.getAttribute("placeholder");
    aceEditor.setValue(textarea_selectedItem.value);
    aceEditor.session.setMode("ace/mode/" + textarea_selectedItem.getAttribute("mode"));
    aceEditor.focus();
    aceEditor.navigateFileStart();
    editorWindow.style.visibility = 'visible';
    canClick = false;
}

document.getElementById("virtual-screen").addEventListener('dblclick', (e) => {
    if (canClick)
        switch(selectedItem.getAttribute("type")){
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