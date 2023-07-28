// This addon lets you copy and paste items

var pasteinfo = Array(8);

document.addEventListener('keydown', e => {
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
});
