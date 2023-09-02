const toolbar = document.getElementById("tool-bar");
const snapx = 16;
const snapy = 16;

toolbar.insertAdjacentHTML(
    "afterend",
    "<div style='width: 100%;background-color: var(--background-2);border-bottom:1px solid rgba(0,0,0,0.2);'>" +
        "<div id='extra-tool-bar' style='width:100%;padding-left:8px;padding-right:8px;box-sizing: border-box;'></div>" +
    "</div>"
);

const extraToolbar = document.getElementById("extra-tool-bar");

extraToolbar.innerHTML += "" + 
    "<input type='checkbox' id='snap_to_grid' name='snap_to_grid' checked>" +
    "<label for='snap_to_grid' style='padding-right:8px;'>Snap to grid</label>";

extraToolbar.addEventListener("input", () => {
    if (selected.getAttribute("screen") == null){
        if (document.getElementById("snap_to_grid").checked){
            selected.classList.remove("drag-resize");
            selected.classList.add("grid");
        } else {
            selected.classList.remove("grid");
            selected.classList.add("drag-resize");
        }
    }
})

document.addEventListener("item-clicked", (e) => {
    Array.from(screen_childrens).forEach((el) => {el.classList.remove("grid");});
    if(document.getElementById("snap_to_grid").checked){
        if (e.detail.element.getAttribute("screen") == null){
            selected.classList.remove("drag-resize");
            selected.classList.add("grid");
        }
    } else {
        selected.classList.remove("grid");
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