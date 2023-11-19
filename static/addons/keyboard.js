/**
 * This addon allows you to configure keyboard shortcuts for the Other Apps application editor. 
 */

var clipboard;

document.addEventListener('keydown', e => {
    switch (e.target.tagName.toLowerCase()) {
        case 'input':
        case 'textarea':
            break;
        default:
            // Hide code editor
            if (e.key === "Escape"){
                e.preventDefault();
                Array.from(document.getElementsByClassName("window")).forEach((win) => {
                    win.style.visibility = 'hidden';
                })
                canClick = true;
            }

            // Delete
            if(e.key == "Delete"){
                if (canClick)
                    editorDeleteItem(selectedItem);
            }    

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
                newName = prompt("Rename " + selectedItem.getAttribute("id"), selectedItem.getAttribute("id"));
                if (isValid(newName)){
                    editorRenameItem(selectedItem, newName);
                } else {
                    alert(newName + " is not a valid name");
                }   
            }

            // Cut
            if (e.ctrlKey && e.key === 'x') {
                if (canClick){
                    clipboard = selectedItem.cloneNode(true);
                    editorDeleteItem(selectedItem);
                }
            }

            // Copy
            if (e.ctrlKey && e.key === 'c') {
                if (canClick)
                    clipboard = selectedItem.cloneNode(true);

            }

            // Paste
            if (e.ctrlKey && e.key === 'v') {
                if (clipboard && canClick){
                    if (clipboard.getAttribute("type") != "Screen"){
                        let cloneItem = clipboard.cloneNode(true);
                        renameItem(virtualScreen, cloneItem, cloneItem.id);
                        currentScreen.append(cloneItem);
                        refreshMap();
                        clickItem(cloneItem);
                    } else {
                        let cloneItem = clipboard.cloneNode();
                        renameItem(virtualScreen, cloneItem, cloneItem.id);
                        for (const children of clipboard.childNodes){
                            const cloneChildren = children.cloneNode(true);
                            renameItem(virtualScreen, cloneChildren, cloneChildren.id);
                            cloneItem.append(cloneChildren);
                        }
                        virtualScreen.append(cloneItem);
                        refreshMap();
                        clickItem(cloneItem);
                    }
                }
            }
        }
})