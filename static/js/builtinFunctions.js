function navigate(screen) {
    backScreen = currentScreen;
    currentScreen = screen;

    Array.from(virtualScreen.getElementsByClassName("Screen")).forEach(
        (e) => {
            e.style.height = "0";
        }
    )
    currentScreen.style.height = "100%";
    eval(currentScreen.getAttribute("onVisible"));
}

function back(){
    if (backScreen)
        navigate(backScreen);
}

function destroy(id) {
    id.remove();
}

function values(element, tag = "input") {
    return element.getElementsByTagName(tag);
}

function exevent(type, init = {}) {
    document.dispatchEvent(new CustomEvent(type, init));
}

async function sqljson(database, table, filter = "") {
    url = await getOAConfig("Libre_Lists_host") + "/json/table/" + database + "/" + table + "?f=" + filter;
    const res = await fetch(url, {
        mode:  'cors',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods" : "GET, POST, OPTIONS"
        }
    });
    const data = await res.json();
    return data;
}

async function sqlquery(database, query) {
    url = await getOAConfig("Libre_Lists_host") + "/exec/" + database;
    const res = await fetch(url, {
        mode:  'cors',
        method: "POST",
        body: JSON.stringify({ "query": query }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods" : "GET, POST, OPTIONS"
        }
    });
    const data = await res.json();
    return data;
}