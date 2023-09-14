function resize_app(){
    appWidth = parseInt(appFrame.style.width);
    appHeight = parseInt(appFrame.style.height);
    targetWidth = app.offsetWidth;
    targetHeight = app.offsetHeight;

    scale = app.scrollHeight / targetHeight;
    //document.getElementById("display-name").innerHTML = targetWidth + " / " + appWidth + " = " + targetWidth / appWidth;
    //document.getElementById("display-name").innerHTML += " " + targetHeight + " / " + appHeight + " = " + targetHeight / appHeight;
    if (targetWidth < appWidth){
        scale = targetWidth / appWidth;
    } else {
        scale = targetHeight / appHeight;
    }

    appFrame.style.transform = "scale(" + scale + ")";
}

window.addEventListener('load', () => {
    document.getElementById("display-name").innerHTML = document.getElementById('app-frame').contentWindow.document.getElementById("virtual-screen").getAttribute("name");
    appFrame.style.width = document.getElementById('app-frame').contentWindow.document.getElementById("virtual-screen").style.width;
    appFrame.style.height = document.getElementById('app-frame').contentWindow.document.getElementById("virtual-screen").style.height;

    resize_app();

})

window.addEventListener('resize', () => {
    resize_app();
})