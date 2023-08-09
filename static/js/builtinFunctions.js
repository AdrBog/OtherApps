function navigate(screen_name){
    currentScreen = document.getElementById(screen_name);

    Array.from(virtualScreen.getElementsByClassName("Screen")).forEach(
        (el) => {
            el.style.height = "0";
        }
    )
    currentScreen.style.height = "100%";
    eval(currentScreen.getAttribute("onVisible"));
}

function destroy(id){
    document.getElementById(id).remove();
}

function sqlquery(database, query){
    url = "/database/exec/" + database;
    fetch(url, {
        method: "POST",
        body: JSON.stringify({"final_command": query}),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => console.log(response))
    .catch(err => console.log(err));
}