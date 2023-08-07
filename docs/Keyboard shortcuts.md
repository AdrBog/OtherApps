# Keyboard shortcuts

More shortcuts will be added in the future, for now we have these:

|Keyboard|Function|
|---|---|
|F2|Rename selected item|
|F5|Test the app|
|Ctrl + s|Save the app|
|Ctrl + c|Copy (not screens)|
|Ctrl + v|Paste (not screens)|

You can edit keyboard shortcuts in **static/addons/keyboard.js**

If you want to deactivate keyboard shortcuts, you need to comment the following line in **templates/plugins.html**

```html
<script src="/static/addons/keyboard.js"></script>
```
to
```html
<!--<script src="/static/addons/keyboard.js"></script>-->
```