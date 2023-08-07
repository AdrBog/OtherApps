// This addon lets you add keyboard shortcuts to OtherApps
// The copy and paste shortcuts are edited in "copypaste.js"

var pasteinfo = Array(8);

document.addEventListener('keydown', e => {
    // Save
    if (e.ctrlKey && e.key === 's'){
        e.preventDefault();
        save();
    }

    // Test the app
    if (e.key == 'F5') {
        e.preventDefault();
        test();
    }

    // Rename items
    if (e.key == 'F2') {
        e.preventDefault();
        newName = prompt("Rename " + selected.getAttribute("id"), selected.getAttribute("id"));
        if (newName)
            rename(selected.getAttribute("id"), newName);
    }

    // Copy
    if (e.ctrlKey && e.key === 'c') {
        if (can_click)
            pasteinfo = [
                selected.getAttribute("id"),
                selected.innerHTML,
                selected.getAttribute("class").split(" ", 1)[0],
                selected.getAttribute("class").split(" ", 1)[0].toLowerCase(),
                selected.getAttribute("style"),
                selected.getAttribute("data-x"),
                selected.getAttribute("data-y"),
                selected.getAttribute("onclickalt"),
            ];
    }

    // Paste
    if (e.ctrlKey && e.key === 'v') {
        if (pasteinfo[3] != "screen" && can_click){
            new_item = insert(pasteinfo[3]);
            new_element = document.getElementById(new_item);
            new_element.setAttribute("style", pasteinfo[4]);
            new_element.setAttribute("data-x", pasteinfo[5]);
            new_element.setAttribute("data-y", pasteinfo[6]);
            new_element.setAttribute("onclickalt", pasteinfo[7]);
            new_element.innerHTML = pasteinfo[1];
            new_id = rename(new_item, pasteinfo[0]);
            click(document.getElementById(new_id));
        }
    }
})