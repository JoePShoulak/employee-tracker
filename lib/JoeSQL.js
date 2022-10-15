// I'd name this SQLHelper but it'd be too long. 
// I'd name it MySQL but... well, you know. 
import mysql2 from "mysql2";
import fs from "fs";

import SECRETS from "../secrets.js";

/* == MISC == */
const SQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: SECRETS.SQL,
    database: 'employee_tracker'
}

/* == HELPERS == */
const filterStatement = (statement, filter) => {
    if (filter) {
        statement += `WHERE ${filter.param}=${filter.value} `;
    }

    return statement;
}

const joinStatement = (statement, joins=[]) => {
    if (joins != []) {
        for (let join of joins) {    
            statement += `INNER JOIN ${join.secondTable}
            ON ${join.firstTable}.${join.firstID}=${join.secondTable}.${join.secondID} `;
        }
    }
    
    return statement;
}

/* == JOESQL HELPER CLASS == */
class JoeSQL {
    /* == CONSTRUCTOR == */
    constructor() {
        this.connection = null;
        return this;
    }

    /* == SUGAR FUNCTIONS == */
    // Connect to the DB
    connect() {
        return this.connection = mysql2.createConnection(SQL_CONFIG);
    }

    // Close the DB connection
    end() {
        this.connection.end();
    }

    /* == MAIN FUNCTIONS == */
    // Display all rows of a given table
    displayTable(table, joins = [], filter = null) {
        let statement = `SELECT * FROM ${table} `;

        statement = joinStatement(statement, joins)
        statement = filterStatement(statement, filter);

        console.log(statement);

        this.connect().query(statement, (_err, results) => {
            this.end();

            console.log("\n");
            console.table(results)
        })
    }

    // Insert an object into a given table
    insert(table, obj) {
        const myKeys = Object.keys(obj).join(", ");
        const myValues = Object.values(obj).map(i => `"${i}"`).join(", ").replace('"null"', 'null');
    
        const statement = 
            `INSERT INTO ${table}
            (${myKeys})
            VALUES
            (${myValues});`;

        this.connect().query(statement, (err) => {
            this.end();
            if (err) console.log(err);
        });
    }

    // Update an object given it's name and table, and the change to be made
    update(table, id, changes) {
        let statement = `UPDATE ${table} SET `;

        for (let change of changes) {
            statement += `${change.column} = ${change.value}, `
        }

        statement = statement.slice(0, -2);

        statement += ` WHERE ID = ${id}`;

        this.connect().query(statement, (err) => {
            this.end();
            if (err) console.log(err);
        });
    }

    delete(table, id) {
        const statement = `DELETE FROM ${table} WHERE id=${id};`;

        this.connect().query(statement, (err) => {
            this.end();
            if (err) console.log(err);
        });
    }

    displaySum(table, column, filter, joins) {
        let statement = 
            `SELECT SUM(${column}) FROM ${table} `;

        statement = joinStatement(statement, joins);
        statement = filterStatement(statement, filter);

        this.connect().query(statement, (err, result) => {
            this.end();
            if (err) console.log(err);

            console.log(`\nThat department's budget is $${result[0]["SUM(salary)"]}`)
        });
    }

    // FIXME
    reset() {
        const schema = fs.readFileSync("db/schema.sql", {encoding: "utf-8"});
        const seed = fs.readFileSync("db/seed.sql", {encoding: "utf-8"});
        
        this.connect();
        
        this.connection.query(schema);
        this.connection.query(seed);

        this.end();
    }
}

export default JoeSQL;
