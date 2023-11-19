# Addons

Addons in Other Apps are nothing more than simple javascript files that are included when loading the page.

These files add extra functionality to the Other Apps.

Extensions are located in **static/addons** by default.

## Pre-instaled addons

These addons comes with Other Apps, so they are stored in the repository.
| Addons name | Function |
|--|--|
| **extraToolbar.js** | Adds an extra toolbar in your app editor |
| **extraInsert.js** | Adds more items to add in the Insert list |
| **extraEditor.js** | Adds more options for your code editor (Font size and line wrap) |
| **extraEdits.js** | Adds more option in the right sidebar of the editor |
| **keyboard.js** | Add keyboard shortcuts in your editor |
| **dblclick.js** | Display the code editor when you double click an item |
| **unsave.js** | Show "unsaved changes" dialog when you close the editor |
| **scaleApp.js** | Apps are scaled to fit screen size |

## Addons config file

The list of extensions to be executed is stored in **config/addons.json**

It is a json file in which the path where the extensions are located is stored.
```json
{
    "Index": [],
    "Editor":[
        "/static/addons/extraToolbar.js",
        "/static/addons/extraInsert.js",
        "/static/addons/extraEditor.js",
        "/static/addons/extraEdits.js",
        "/static/addons/keyboard.js",
        "/static/addons/dblclick.js",
        "/static/addons/unsave.js"
    ],
    "Play": [
        "/static/addons/scaleApp.js"
    ],
    "Embed": []
}
```

Depending on where you add the extension, it will run in one path or another.

| Value | Route |
| -- | -- |
| **Index** | / |
| **Editor** | /edit |
| **Play** | /play |
| **Embed** | /embed |

Note that you can't save an addon wherever you want, make sure the addon is (at least) in the **static** folder

##
Click this link to learn [how to create your own addons](Create_your_own_Addons.md)