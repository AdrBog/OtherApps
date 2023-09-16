var fontSize = 24;

document.getElementById("text-editor").insertAdjacentHTML("afterend",
"<div class='horizontal-container' style='background-color:var(--background-1);color=var(--text)' id='editor-toolbar' >" +
"<button style='padding:0;' onclick='FontPlus();'>Font +</button>" +
"<button style='padding:0;' onclick='FontMinus();'>Font -</button>" +
"<input id='wrap' type='checkbox' checked></input><label for='wrap'>Wrap</label>" +
"</div>");

document.getElementById("wrap").addEventListener("input", () => {
    aceEditor.setOption("wrap", document.getElementById("wrap").checked);
})

function FontPlus(){
    fontSize += 5;
    aceEditor.setFontSize(fontSize + "px");
}

function FontMinus(){
    fontSize -= 5;
    aceEditor.setFontSize(fontSize + "px");
}