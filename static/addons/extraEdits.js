document.getElementById("table-decor-options").innerHTML += "<tr>" +
    "<td>Transparent Background</td>" + 
    "<td><input type='checkbox' id='edit-info-transparent-bg'></td>" +
    "</tr>";

document.addEventListener('item-clicked', () => {
    if (selected.style.backgroundColor == "transparent"){
        document.getElementById("edit-info-transparent-bg").checked = true;
    } else {
        document.getElementById("edit-info-transparent-bg").checked = false;
    }
})

document.addEventListener('table-decor-changed', () => {
    if (document.getElementById("edit-info-transparent-bg").checked)
        selected.style.backgroundColor = "transparent";
})