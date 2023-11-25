/**
 * List of tag-related functions
 */

function getAllItemsWithTag(root, tag){
    let array = new Array;
    for (const item of getAllItems(root))
        if (getItemTags(item).includes(tag))
            array.push(item)
    return array;
}

function getItemTags(item){
    return item.getAttribute("tags").split(" ");
}