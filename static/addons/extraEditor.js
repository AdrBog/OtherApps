var fontSize = 24;

document.getElementById("text-editor").insertAdjacentHTML("afterend",
`
<div class='horizontal-container' id='editor-toolbar' >
    <button style='padding:0;' onclick='FontPlus();'>Font +</button>
    <button style='padding:0;' onclick='FontMinus();'>Font -</button>
    <div class="flex">
        <input id='wrap' type='checkbox' checked></input>
        <label for='wrap'>Wrap</label>
    </div>
</div>
`
);

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