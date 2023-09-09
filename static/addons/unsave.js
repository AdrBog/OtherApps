changed = false;

window.onbeforeunload = function (e) {
    e = e || window.event;
    if (e && changed) {
        e.returnValue = 'Sure?';
    }
};

document.addEventListener("app-saved",      () => { changed = false; });
document.addEventListener("input",          () => { changed = true; });
document.addEventListener("item-created",   () => { changed = true; });
document.addEventListener("item-deleted",   () => { changed = true; });