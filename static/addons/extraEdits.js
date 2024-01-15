/**
 * This add-on gives you extra customization options for your items
 */

const OPTIONS = [
    {   // Tranparent
        "baseId": "tr-info-bgcolor",
        "displayName": "Transparent",
        "type": "checkbox",
        "id": "edit-info-transparent-screen"
    },
    {   // Use pre white-space
        "baseId": "tr-info-text",
        "displayName": "Pre white-space",
        "type": "checkbox",
        "id": "edit-info-use-pre"
    },
    {   // Overflow
        "baseId": "tr-info-text",
        "displayName": "Overflow",
        "type": "select",
        "id": "edit-info-overflow",
        "options": [
            ["unset", "Unset"],
            ["hidden", "Hidden"],
            ["scroll", "Scroll"]
        ]
    },
    {   // Align items
        "baseId": "tr-info-text",
        "displayName": "Align Items",
        "type": "select",
        "id": "edit-info-align-items",
        "options": [
            ["center", "Center"],
            ["baseline", "Baseline"],
            ["end", "End"],
            ["flex-end", "Flex-end"],
            ["flex-start", "Flex-start"],
            ["inherit", "Inherit"],
            ["normal", "Normal"],
            ["revert", "Revert"],
            ["self-end", "Self-end"],
            ["self-start", "Self-start"],
            ["start", "Start"],
            ["unset", "Unset"]
        ]
    },
    {   // Flex direction
        "baseId": "tr-info-text",
        "displayName": "Flex direction",
        "type": "select",
        "id": "edit-info-flex-direction",
        "options": [
            ["row", "Row"],
            ["row-reverse", "Row (reverse)"],
            ["column", "Column"],
            ["column-reverse", "Column (reverse)"]
        ]
    },
    {   // Display
        "baseId": "tr-info-text",
        "displayName": "Display",
        "type": "select",
        "id": "edit-info-display",
        "options": [
            ["flex", "Flex"],
            ["grid", "Grid"],
            ["block", "Block"],
            ["inline", "Inline"]
        ]
    },
    {   // Visibility
        "baseId": "tr-info-w-h",
        "displayName": "Visibility",
        "type": "select",
        "id": "edit-info-visible",
        "options": [
            ["visible", "Visible"],
            ["hidden", "Hidden"]
        ]
    },
    {   // Font family option
        "baseId": "tr-info-font-size",
        "displayName": "Font Family",
        "type": "select",
        "id": "edit-info-font-family",
        "options": [
            ["Arial", "Arial"],
            ["Verdana", "Verdana"],
            ["Tahoma", "Tahoma"],
            ["Trebuchet MS", "Trebuchet MS"],
            ["Times New Roman", "Times New Roman"],
            ["Georgia", "Georgia"],
            ["Garamond", "Garamond"],
            ["sans-serif", "Sans Serif"],
            ["Courier New", "Courier New"],
            ["Brush Script MT", "Brush Script MT"],
            ["System-UI", "System-UI"],
            ["icon-worksregular", "Icon-Works"],
            ["aurulent-sans-mono", "Aurulent Sans Mono"]
        ]
    },
    {   // Text align
        "baseId": "tr-info-font-size",
        "displayName": "Text align",
        "type": "select",
        "id": "edit-info-text-align",
        "options": [
            ["left", "Left"],
            ["center", "Center"],
            ["right", "Right"],
            ["justify", "Justify"]
        ]
    },
    {   // Tranparent background option
        "baseId": "tr-info-color",
        "displayName": "Transparent",
        "type": "checkbox",
        "id": "edit-info-transparent-bg"
    },
]

for (const option of OPTIONS) {
    if (option["type"] == "select"){
        document.getElementById(option["baseId"]).insertAdjacentHTML("afterend",`
            <tr>
            <td>${option["displayName"]}</td>
            <td>
                <select id='${option["id"]}'>
                    ${option["options"].map((x) => `<option value="${x[0]}">${x[1]}</option>`).join("\n")}
                </select>
            </td>
            </tr>
            `
        )
    } else {
        document.getElementById(option["baseId"]).insertAdjacentHTML("afterend",`
            <tr>
            <td>${option["displayName"]}</td> 
            <td><input type='${option["type"]}' id='${option["id"]}'></td>
            </tr>
            `
        )
    }
        
}


document.addEventListener('item-clicked', () => {
    document.getElementById("edit-info-visible").value = selectedItem.style.visibility;
    document.getElementById("edit-info-display").value = selectedItem.style.display;
    document.getElementById("edit-info-flex-direction").value = selectedItem.style.flexDirection;
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
    selectedItem.style.flexDirection = document.getElementById("edit-info-flex-direction").value;
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