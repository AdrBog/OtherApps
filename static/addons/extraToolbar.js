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
    Array.from(screenChildrens).forEach((el) => {el.classList.remove("grid");});
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
    snapSize: {
        targets: [
          { x: 32 },
          interact.createSnapGrid({ x: snapx, y: snapy }),
        ],
      },
})

interact(".grid")
.draggable({
    // the top left corner of the element will be (0, 0)
    origin: 'parent',
snap: {
        // snap targets pay attention to the action's origin option
    targets: [
        interact.createSnapGrid({
            x: snapx,
            y: snapy,
        })
    ],
    relativePoints: [
        { x: 0, y: 0 }
    ]
},
restrict: {
        // restrictions *don't* pay attention to the action's origin option
    // so using 'parent' for both origin and restrict.restriction works
    restriction: 'parent',
    elementRect: {top: 0, left: 0, bottom: 1, right: 1}
},
})
.on('dragmove', function (event) {
var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

// translate the element
target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

// update the posiion attributes
target.setAttribute('data-x', x);
target.setAttribute('data-y', y);
});