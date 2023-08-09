# Built-in functions
Built in functions are functions that don't exist in pure Javascript, they only work in OtherApps.

Here's a list of all the current built in functions we have in OtherApps

| Function      | Variables | Function
|---|---|---|
| navigate  | screen_name| Change the current screen to **screen_name** |
| destroy     | id | Destroy an element with the given **id** |
| sqlquery      | database, query     | Executes a **query** on the given **database** |

## Examples

```js
// This will change the current screen to "Screen1"
navigate("Screen1");

// This will destroy the item with id "Button1"
destroy("Button1");

// This will add a new entry to the "foo" database in the "bar" table
sqlquery("foo", "INSERT INTO bar (title) VALUES ('eggs')");
```

You can edit or add your own functions in **static/js/builtinFunctions.js**