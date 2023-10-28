# Libre Lists Connection
You can use the LibreListsConnection class to obtain and modify data from Libre Lists databases.

You can edit and modify this class in static/js/LibreLists.js

## 0. Configuration
Assume the following situation:
- Other Apps is running in 192.168.0.1:5000
- Libre Lists is running in 192.168.0.1:5001

Before using the class make sure that:
1. Both Other Apps and Libre Lists are running
2. Other Apps has in its configuration the path where Libre Lists runs and vice versa.

In Other Apps, in config/config.json should appear this value
```json
"Libre_Lists_host" : "http://192.168.0.1:5001"
```
And in Libre Lists
```json
"Ohter_Apps_host": ["http://192.168.0.1:5000"]
```

## 1. Initializing the connection

Let's use a sample database containing data about employees, which contains the following table:

Database name is **office** and table name is **employees**

|**id**|**name**|**age**|
|--|--|--|
|0|John|32|
|1|Mary|24|
|2|Mark|26|

You can initialize the connection with the following command.

```js
conn = new LibreListsConnection("office", "employees");
```

## 2. Getting data from the table

The collect() function returns an array containing all the data from the table.

```js
async function refresh(){
    table = await conn.collect();
}
```

```js
console.log(table);
// OUTPUT
// Array(3)
// 0: {id = 0, name: 'John', age: 32}
// 1: {id = 1, name: 'Mary', age: 24}
// 2: {id = 2, name: 'Mark', age: 26}
```

## 3. Getting only one item by id
Use the function getItemById() to get info of one arrow.

For example:
```js
console.log(await conn.getItemById("1"));
// OUTPUT
// Object
//  id: 1
//  name: 'Mary'
//  age: 24
```

## 4. Execute SQLite commands
Use SQLite() to execute a query in the database

For example, if we want to add a new employee use the following command:
```js
await conn.SQLite("INSERT INTO employees (name, age) VALUES ('Lucy', 30)");
```

## 5. Delete item
Use deleteItem() to delete an item from the table, specify the id of the item to delete.

For example, if we want to delete Mark from the table, use this command:
```js
await conn.deleteItem("2");
```