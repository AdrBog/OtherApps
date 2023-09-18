const valid_name = /^[a-zA-Z0-9_]{1,50}$/g;

function sql_execute(database, final_command){
    return new Promise((resolve) => fetch("/database/exec/" + database, {
        method: "POST",
        body: JSON.stringify({ "final_command": final_command }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(resolve));
}

function fix_color_format(color){
    rgb = color.substring(4, color.length-1).replace(/ /g, '').split(',');
    r = Number(rgb[0]).toString(16);
    g = Number(rgb[1]).toString(16);
    b = Number(rgb[2]).toString(16);
    return('#' + r + g + b);  
}