# Create your own addons
Note: this section of the documentation is incomplete.

**In previous versions of OtherApps (< 0.5.0), the names of some variables and functions were different. All names that appear in this section of the documentation are final and will (probably) not be changed in the future.**

## Table of contents
- [Variables](#variables)
    - [Editor variables](#editor-variables)
    - [Global variables](#global-variables)
- [Functions](#functions)
    - [Editor functions](#editor-functions)
    - [Global functions](#global-functions)
- [Custom properties](#add-custom-properties-to-your-app)

## Variables
Here is a list of variables that may be useful when creating addons for Other Apps
### Editor variables
These variables are only present when you are in the application editor. They are stored in **templates/edit.html**
| Name | Typeof | Function |
|--|--|--|
| **compConfig** | object | This object stores the component configuration. You can add your own properties.
| **currentScreen** | object | This variable is updated depending on the screen the user is currently editing.
| **currentVer** | string | The current version of Other Apps
| **selectedItem** | object | The item that the user has selected at the moment

### Global variables
These variables are accessible anywhere in the application. They are stored in **static/js/global.js**
| Name | Typeof | Function |
|--|--|--|
| **DEFAULT_APP_CONFIG** | object | This object stores the default properties when creating an OtherApps application.
| **DEFAULT_SCREEN_CONFIG** | object | This object contains the properties of the default screen
| **DEFAULT_BUTTON_CONFIG** | object | This object contains the properties of the default button
| **DEFAULT_LABEL_CONFIG** | object | This object contains the properties of the default label

## Functions
Here is a list of functions that may be useful when creating addons for Other Apps
### Editor functions
These functions only work when you are in the application editor. They are stored in **templates/edit.html**
| Name | Function | Returns
|--|--|--|
| **applyConfig()** | Applies the current settings stored in **compConfig** to the component, e.g. the screen size changes.
| **changeScreen(** *object* screen **)** | This function changes the current screen to edit and it also updates the **currentScreen** variable
| **clickItem(** *object* item **)** | This function will select an item and update the **selectedItem** variable
| **editorDeleteItem(** *object* item **)** | This function deletes an item, note that deleting a screen also deletes its children.
| **editorInsertItem(** *string* type **)** | This function inserts a new item in the **currentScreen**, the type must be one of the following three: "label", "button" or "screen". In the case of inserting a new screen, **currentScreen** is updated to this new screen. | The new item (*object*)
| **editorRenameItem(** *object* item, *string* newName **)** | This function renames a specific item, note that the new name will not be the expected one in case an item with that name already exists. | The renamed item (*object*)

### Global functions
These functions can be called from any part of the application. They are stored in **static/js/global.js**

| Name | Function | Returns
|--|--|--|
| **generateChildren(** *object* itemConfig, [*boolean* editable] **)** | Returns the div representing a children. The item configuration indicates the properties of that child, e.g. DEFAULT_LABEL_CONFIG or DEFAULT_BUTTON_CONFIG. Set the editable parameter to true if you are in the application editor. | (*object*)
| **generateScreen(** *object* itemConfig, [*boolean* editable]  **)** | Returns the div that represents a screen. The item configuration indicates the properties of that screen, e.g. DEFAULT_SCREEN_CONFIG. Set the editable parameter to true if you are in the application editor. | (*object*)
| **getAllChildrens(** *object* screen **)** | Returns a list of all childrens in a screen, e.g. currentScreen | (*object*)
| **getAllItems(** *object* root **)** | Returns a list of all root items, e.g. virtualScreen | (*object*)
| **getAllScreens(** *object* root **)** | Returns a list of all root screens, e.g. virtualScreen | (*object*)
| await **getCompData(** *string* id, [*string* c] **)** | This function returns the entire xml of an application given its id and the component (optional) | (*object*)
| **getItemConfig(** *object* item **)** | Returns the item's configuration | (*object*)
| await **getOAConfig(** *string* attributeName **)** | Returns an attribute of the Other Apps configuration file. | The attribute value (*any*)
| **hex(** *any* c **)** | Convert the given number to hexadecimal | The number in hexadecimal (*string*)
| **insertChildren(** *object* screen, *object* itemConfig, [*boolean* editable] **)** | This function adds a children to the screen. If you are creating an addon for the application editor, it is more advisable to use **editorInsertItem("button" or "label")**. | (*object*)
| **insertScreen(** *object* root, *object* itemConfig, [*boolean* editable] **)** | This function adds a screen at the root. If you are creating an addon for the application editor, it is more advisable to use **editorInsertItem("screen")**. | (*object*)
| **isValid(** *string* name **)** | Checks if a name is valid or not | (*boolean*)
| **renameItem(** *object* root, *object* item, *string* newName **)** | This function renames a root item. If you are creating an addon for the application editor, it is more advisable to use **editorRenameItem()**. Note that the new name may not be the expected one if an item with that name already exists. | (*object*)
| **rgbToHex(** *string* color **)** | Converts the color with format rgb(r,g,b) to hexadecimal format | Color in hexadecimal (*string*)
| **saveComponent(** *string* id, *string* xmlData, [*string* component] **)** | This function saves the component in the user's file system. By default, the component is **1** |
| **validateName(** *string* name **)** | Converts an invalid name to a valid one. E.g., if you enter "Botón 32" it returns "Botn32". | The valid name (*string*)


## Add custom properties to your app
You can add custom properties to your component like this:
```js
compConfig["customproperty"] = "32";
```
This will be stored as an attribute in the XML of your application.
```xml
<Component ... customproperty="32" ...>
```
You can also add your own attributes to an item
```js
selectedItem.setAttribute("customprop", "64");
```
This will also be stored as an attribute in the XML of your application.
```xml
<Screen ... customprop="64" ...>
```