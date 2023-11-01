# Scripting in Other Apps

Scripting in Other Apps helps you adding functionality to your application.
Scripts can be added from the OnVisible property of the Screens or the OnClick property of the Buttons.

## Table of Contents
1. [Referencing items](#referencing-items)
2. [Built-in functions](#built-in-functions)
    1. [Examples](#examples)

## Referencing items
Suppose we have the following scenario:
- Screen0
    - Label0
    - Button0

And we want to change "Label0" text for another one when clicking "Button0". We have to add a script in the OnClick property of "Button0".
We could use the traditional javascript way of referencing the label:
```js
document.getElementById("Label0").innerText = "Another text";
```
But in Other Apps there is a simpler way to reference the object, we can always write:
```js
_Label0.innerText = "Another text";
```
Note that the two commands above do exactly the same thing, because:
```js
_Label0 == document.getElementById("Label0") // => true
// The same goes with the rest of the items in the app
_Screen0 == document.getElementById("Screen0") // => true
_Button0 == document.getElementById("Button0") // => true
```

## Built-in functions
Built in functions are functions that don't exist in pure Javascript, they only work in OtherApps.

Here's a list of some of the current built-in functions we have in OtherApps

| Function      | Variables | Function
|---|---|---|
| navigate  | screen_name| Change the current screen to **screen_name** |
| destroy     | id | Destroy an element with the given **id** |
| sqlquery      | database, query     | Executes a **query** on the given **database** |

### Examples

```js
// This will change the current screen to "Screen1"
navigate("Screen1");

// This will destroy the item with id "Button1"
destroy("Button1");

// This will add a new entry to the "foo" database in the "bar" table
sqlquery("foo", "INSERT INTO bar (title) VALUES ('eggs')");
```

You can edit or add your own functions in **static/js/builtinFunctions.js**