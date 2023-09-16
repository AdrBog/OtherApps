const valid_name = /^[a-zA-Z0-9_]{1,50}$/g;

function sql_execute(database, final_command){
    return new Promise((resolve) => fetch("/database/exec/" + database, {
        method: "POST",
        body: JSON.stringify({ "final_command": final_command }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(resolve));
}