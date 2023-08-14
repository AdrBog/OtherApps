// This addon lets you add keyboard shortcuts to OtherApps
// The copy and paste shortcuts are edited in "copypaste.js"

var pasteinfo = Array(8);

var snapx = 16;
var snapy = 16;

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

    // Cut
    if (e.ctrlKey && e.key === 'x') {
        if (can_click && selected.getAttribute("class").split(" ", 1)[0].toLowerCase() != "screen"){
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
            del(selected.getAttribute("id"));
        }
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

    // Snap to grid
    if(e.ctrlKey && selected.getAttribute("class").split(" ", 1)[0].toLowerCase() != "screen"){
        selected.classList.remove("drag-resize");
        selected.classList.add("grid");
    }
})

document.addEventListener('keyup', e => {
    // Deactivate snap to grid
    if(e.key = "Control"){
        Array.from(screen_childrens).forEach(
            (el) => {
                el.classList.remove("grid");
            }
        );
        if (selected.getAttribute("class").split(" ", 1)[0].toLowerCase() != "screen")
            selected.classList.add("drag-resize");
    }
})


interact(".grid")
.resizable({
    edges: { left: true, right: true, bottom: true, top: true },
    listeners: {
    move (event) {
        var target = event.target
        var x = (parseFloat(target.getAttribute('data-x')) || 0)
        var y = (parseFloat(target.getAttribute('data-y')) || 0)

        // update the element's style
        target.style.width = event.rect.width+ 'px'
        target.style.height = event.rect.height + 'px'

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top

        target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
    }
    },
    modifiers: [
    interact.modifiers.snap({
        targets: [interact.snappers.grid({ x: snapx, y: snapy })],
        range: Infinity,
        relativePoints: [ { x: 0, y: 0 } ]
    }),
    // keep the edges inside the parent
    interact.modifiers.restrictEdges({
        outer: 'parent'
    }),

    // minimum size
    interact.modifiers.restrictSize({
        min: { width: 32, height: 32 }
    })
    ],
})
.draggable({
    listeners: { move (event){
        var target = event.target
        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
        var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
        target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
    } },
    modifiers: [
        interact.modifiers.snap({
            targets: [
              interact.snappers.grid({ x: snapx, y: snapy })
            ],
            range: Infinity,
            relativePoints: [ { x: 0, y: 0 } ]
          }),
        interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true
    })
]})