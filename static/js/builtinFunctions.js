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