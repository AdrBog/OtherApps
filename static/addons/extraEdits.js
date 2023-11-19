// Use pre white-space
document.getElementById("tr-info-bgcolor").insertAdjacentHTML("afterend",
    "<tr>" +
    "<td>Transparent</td>" + 
    "<td><input type='checkbox' id='edit-info-transparent-screen'></td>" +
    "</tr>"
)

// Use pre white-space
document.getElementById("tr-info-text").insertAdjacentHTML("afterend",
    "<tr>" +
    "<td>Pre white-space</td>" + 
    "<td><input type='checkbox' id='edit-info-use-pre'></td>" +
    "</tr>"
)

// Overflow
document.getElementById("tr-info-text").insertAdjacentHTML("afterend",
    "<tr>" +
    "<td>Overflow</td>" + 
    "<td><select id='edit-info-overflow'>" +
    "<option value='unset'>Unset</option>" +
    "<option value='hidden'>Hidden</option>" +
    "<option value='scroll'>Scroll</option>" +
    "</select>" +
    "</tr>"
)

// Align items
document.getElementById("tr-info-text").insertAdjacentHTML("afterend",
    "<tr>" +
    "<td>Align Items</td>" + 
    "<td><select id='edit-info-align-items'>" +
    "<option value='center'>Center</option>" +
    "<option value='baseline'>Baseline</option>" +
    "<option value='end'>End</option>" +
    "<option value='flex-end'>Flex-end</option>" +
    "<option value='flex-start'>Flex-start</option>" +
    "<option value='inherit'>Inherit</option>" +
    "<option value='normal'>Normral</option>" +
    "<option value='revert'>Revert</option>" +
    "<option value='self-end'>Self-end</option>" +
    "<option value='self-start'>Self-start</option>" +
    "<option value='start'>Start</option>" +
    "<option value='unset'>Unset</option>" +
    "</select>" +
    "</tr>"
)

// Display
document.getElementById("tr-info-text").insertAdjacentHTML("afterend",
    "<tr>" +
    "<td>Display</td>" + 
    "<td><select id='edit-info-display'>" +
    "<option value='flex'>Flex</option>" +
    "<option value='grid'>Grid</option>" +
    "<option value='block'>Block</option>" +
    "<option value='inline'>Inline</option>" +
    "</select>" +
    "</tr>"
)

// Visibility
document.getElementById("tr-info-w-h").insertAdjacentHTML("afterend",
    "<tr>" +
    "<td>Visibility</td>" +
    "<td><select id='edit-info-visible'>" +
    "<option value='visible'>Visible</option>" +
    "<option value='hidden'>Hidden</option>" +
    "</select></td>" +
    "</tr>"
);

// Tranparent background option
document.getElementById("tr-info-color").insertAdjacentHTML("afterend",
    "<tr>" +
    "<td>Transparent</td>" + 
    "<td><input type='checkbox' id='edit-info-transparent-bg'></td>" +
    "</tr>"
);

// Font family option
document.getElementById("tr-info-font-size").insertAdjacentHTML("afterend",
    "<tr>" +
    "<td>Font Family</td>" +
    "<td>" +
    "<select id='edit-info-font-family'>" +
    "<option value='Arial'>Arial</option>" +
    "<option value='Verdana'>Verdana</option>" +
    "<option value='Tahoma'>Tahoma</option>" +
    "<option value='Trebuchet MS'>Trebuchet MS</option>" +
    "<option value='Times New Roman'>Times New Roman</option>" +
    "<option value='Georgia'>Georgia</option>" +
    "<option value='Garamond'>Garamond</option>" +
    "<option value='sans-serif'>Sans Serif</option>" +
    "<option value='Courier New'>Courier New</option>" +
    "<option value='Brush Script MT'>Brush Script MT</option>" +
    "<option value='System-UI'>System-UI</option>" +
    "<option value='icon-worksregular'>Icon-Works</option>" +
    "<option value='aurulent-sans-mono'>Aurulent Sans Mono</option>" +
    "</select>" +
    "</td></tr>"
);

// Text align
document.getElementById("tr-info-font-size").insertAdjacentHTML("afterend",
    "<tr>" +
    "<td>Text Align</td>" +
    "<td>" +
    "<select id='edit-info-text-align'>" +
    "<option value='left'>Left</option>" +
    "<option value='center'>Center</option>" +
    "<option value='right'>Right</option>" +
    "<option value='justify'>Justify</option>" +
    "</select>" +
    "</td></tr>"
);


document.addEventListener('item-clicked', () => {
    document.getElementById("edit-info-visible").value = selectedItem.style.visibility;
    document.getElementById("edit-info-display").value = selectedItem.style.display;
    document.getElementById("edit-info-align-items").value = selectedItem.style.alignItems;
    document.getElementById("edit-info-overflow").value = selectedItem.style.overflow;
    document.getElementById("edit-info-font-family").value = selectedItem.style.fontFamily;
    document.getElementById("edit-info-text-align").value = selectedItem.style.justifyContent;
    document.getElementById("edit-info-use-pre").checked = selectedItem.style.whiteSpace == "pre";
    document.getElementById("edit-info-transparent-bg").checked = selectedItem.style.backgroundColor == "transparent";
    document.getElementById("edit-info-transparent-screen").checked = currentScreen.style.backgroundColor == "transparent"
})

document.addEventListener('table-text-changed', () => {
    selectedItem.style.display = document.getElementById("edit-info-display").value;
    selectedItem.style.overflow = document.getElementById("edit-info-overflow").value;
    selectedItem.style.alignItems = document.getElementById("edit-info-align-items").value;
    if(document.getElementById("edit-info-use-pre").checked){
        selectedItem.style.whiteSpace = "pre";
    } else {
        selectedItem.style.whiteSpace = null;
    }
})

document.addEventListener('table-show-changed', () => {
    selectedItem.style.visibility = document.getElementById("edit-info-visible").value;
})

document.addEventListener('table-screen-changed', () => {
    if (document.getElementById("edit-info-transparent-screen").checked)
        currentScreen.style.backgroundColor = "transparent";
})

document.addEventListener('table-decor-changed', () => {
    if (document.getElementById("edit-info-transparent-bg").checked)
        selectedItem.style.backgroundColor = "transparent";

    selectedItem.style.fontFamily = document.getElementById("edit-info-font-family").value;
    selectedItem.style.justifyContent = document.getElementById("edit-info-text-align").value;
    selectedItem.style.textAlign = document.getElementById("edit-info-text-align").value;
})