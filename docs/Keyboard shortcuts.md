# Keyboard shortcuts
More shortcuts will be added in the future, but for now we have these shortcuts:

| Keyboard      | Function |
| --------- | -----|
| F2  | Rename selected item |
| F5     |   Test the app |
| Ctrl            |    Snap to grid   |
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

## Known issues
- Snap to grid does not work in Firefox unless the **privacy.resistFingerprinting** option is set to false. You can change it in **about:config**. Another alternative is to change the keyboard shortcut to one that Firefox can detect.