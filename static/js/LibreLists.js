class LibreListsConnection{
    constructor (database, tableName, idCol = "id"){
        this.database = database;
        this.tableName = tableName;
        this.idCol = idCol;
    }

    async collect(filter = ""){
        const res = await fetch(await getOAConfig("Libre_Lists_host") + "/json/table/" + this.database + "/" + this.tableName + "?f=" + filter,
        {
            mode:  'cors',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods" : "GET, POST, OPTIONS"
            }
        });
        const data = await res.json();
        return data;
    }

    async getItemById(id){
        const f = await this.collect("WHERE " + this.idCol + " = " + id)
        return f[0];
    }

    async deleteItem(id){
        const res = await this.SQLite(`DELETE FROM ${this.tableName} WHERE ${this.idCol} = ${id}`);
        return res;
    }

    async SQLite(query){
        const res = await fetch(await getOAConfig("Libre_Lists_host") + "/exec/" + this.database, 
        {
            mode:  'cors',
            method: "POST",
            body: JSON.stringify({ "query": query }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods" : "GET, POST, OPTIONS"
            }
        });
        const data = await res.json();
        return data;
    }
}