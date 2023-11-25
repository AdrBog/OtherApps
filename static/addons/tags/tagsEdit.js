/**
 * This addon helps you to group items by tags to ease 
 * the interaction with multiple items in less lines of code.
 */

const TAGS_ATTRIBUTE = "tags";
let tableTags = addTagTable();
let infoTags = tableTags.querySelector("[id = 'edit-info-tags']");

function addTagTable(){
    const div = document.createElement("div");
    const table = document.createElement("table");
    const tr = document.createElement("tr");
    const tdLabel = document.createElement("td");
    const tdInput = document.createElement("td");
    const input = document.createElement("input");

    div.id = "table-tags";
    table.id = "table-tags-options";
    tr.id = "tr-info-tags";
    input.id = "edit-info-tags";
    
    tdLabel.innerText = "Tags";
    
    tdInput.append(input);
    tr.append(tdLabel, tdInput);
    table.append(tr);
    div.append(table);
    
    document.getElementById("table-id").insertAdjacentElement("afterend", div);
    return div;
}

tableTags.addEventListener("input", () => {
    selectedItem.setAttribute(TAGS_ATTRIBUTE, infoTags.value);
})

document.addEventListener("item-created", (e) => {
    selectedItem.setAttribute(TAGS_ATTRIBUTE, e.detail["item"].getAttribute("type"));
    clickItem(selectedItem);
})

document.addEventListener("item-clicked", () => {
    infoTags.value = selectedItem.getAttribute(TAGS_ATTRIBUTE);
})