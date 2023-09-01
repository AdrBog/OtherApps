// Use pre white-space
document.getElementById("tr-info-text").insertAdjacentHTML("afterend",
    "<tr>" +
    "<td>Pre white-space</td>" + 
    "<td><input type='checkbox' id='edit-info-use-pre'></td>" +
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
    document.getElementById("edit-info-visible").value = selected.style.visibility;
    document.getElementById("edit-info-display").value = selected.style.display;
    document.getElementById("edit-info-font-family").value = selected.style.fontFamily;
    document.getElementById("edit-info-text-align").value = selected.style.justifyContent;
    document.getElementById("edit-info-use-pre").checked = selected.style.whiteSpace == "pre";
    document.getElementById("edit-info-transparent-bg").checked = selected.style.backgroundColor == "transparent"
})

document.addEventListener('table-text-changed', () => {
    selected.style.display = document.getElementById("edit-info-display").value;
    if(document.getElementById("edit-info-use-pre").checked){
        selected.style.whiteSpace = "pre";
    } else {
        selected.style.whiteSpace = null;
    }
})

document.addEventListener('table-show-changed', () => {
    selected.style.visibility = document.getElementById("edit-info-visible").value;
})

document.addEventListener('table-decor-changed', () => {
    if (document.getElementById("edit-info-transparent-bg").checked)
        selected.style.backgroundColor = "transparent";
    selected.style.fontFamily = document.getElementById("edit-info-font-family").value;
    selected.style.justifyContent = document.getElementById("edit-info-text-align").value;
    selected.style.textAlign = document.getElementById("edit-info-text-align").value;
})