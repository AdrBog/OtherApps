# Keyboard shortcuts
More shortcuts will be added in the future, but for now we have these shortcuts:

| Keyboard      | Function |
| --------- | -----|
| F2  | Rename selected item |
| F5     |   Test the app |
| Ctrl + s      |    Save the app |
| Ctrl + x      |    Cut  (not screens) |
| Ctrl + c      |    Copy  (not screens) |
| Ctrl + v      |    Paste  (not screens) |

Keyboard shortcuts can be edited in **static/addons/keyboard.js**

If for some reason, you don't want keyboard shortcuts, you can deactivate them by commenting the following line in **templates/plugins.html**
```html
<script src="/static/addons/keyboard.js"></script>
```
to:
```html
<!--<script src="/static/addons/keyboard.js"></script>-->
```