function resize_app(){
    appWidth = parseInt(appFrame.style.width);
    appHeight = parseInt(appFrame.style.height);
    targetWidth = app.offsetWidth;
    targetHeight = app.offsetHeight;

    scale = app.scrollHeight / targetHeight;
    
    scale = (targetWidth < appWidth) ? scale = targetWidth / appWidth : scale = targetHeight / appHeight;
    
    appFrame.style.transform = "scale(" + scale + ")";
}

document.addEventListener('app-loaded', () => {resize_app();})
window.addEventListener('resize', () => {resize_app();})