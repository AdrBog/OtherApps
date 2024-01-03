function resize_app(){
    scaledWrapper = app;
    scaledContent = appFrame;
    
    scaledContent.style.transform = 'scale(1, 1)';
    
    let { width: cw, height: ch } = scaledContent.getBoundingClientRect();
    let { width: ww, height: wh } = scaledWrapper.getBoundingClientRect();

    let scaleAmtX = Math.min(ww / cw, wh / ch);
    let scaleAmtY = scaleAmtX;
    
    scaledContent.style.transform = `scale(${scaleAmtX}, ${scaleAmtY})`;
}

document.addEventListener('app-loaded', () => {resize_app();})
window.addEventListener('resize', () => {resize_app();})