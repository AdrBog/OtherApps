function navigate(screen_name) {
    currentScreen = document.getElementById(screen_name);

    Array.from(virtualScreen.getElementsByClassName("Screen")).forEach(
        (el) => {
            el.style.height = "0";
        }
    )
    currentScreen.style.height = "100%";
    eval(currentScreen.getAttribute("onVisible"));
}

function destroy(id) {
    document.getElementById(id).remove();
}

function values(element, tag = "input") {
    return element.getElementsByTagName(tag);
}

function exevent(type, init = {}) {
    document.dispatchEvent(new CustomEvent(type, init));
}

async function sqljson(database, table, filter = "") {
    url = "/database/json/" + database + "/" + table + "?f=" + filter;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

function sqlquery(database, query) {
    url = "/database/exec/" + database;
    return new Promise((resolve) => fetch(url, {
        method: "POST",
        body: JSON.stringify({ "final_command": query }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(resolve));
}