// I'd name this SQLHelper but it'd be too long. 
// I'd name it MySQL but... well, you know. 
import mysql2 from "mysql2";
import fs from "fs";

/* == HELPERS == */

const parseSqlFile = (sqlFile) => {
    return sqlFile
        .toString()
        .replace(/(\r\n|\n|\r)/gm," ") // remove newlines
        .replace(/\s+/g, ' ') // excess white space
        .split(";") // split into all statements
}

const removeEmptyQueries = (queries) => {
    return queries
        .filter(q => q.length)
        .filter(q => q != ' ');
}

/* == STATEMENT PSUEDOCLASS == */

const STATEMENT = {
    select(table) {
        return `SELECT * FROM ${table} `;
    },

    sum(column, table) {
        return `SELECT SUM(${column}) FROM ${table} `;
    },

    insert(table, keys, values) {
        return `INSERT INTO ${table} (${keys}) VALUES (${values});`
    },

    update(table) {
        return `UPDATE ${table} SET `;
    },

    where(id) {
        return ` WHERE ID = ${id}`;
    },

    delete(table, id) {
        return `DELETE FROM ${table} WHERE id=${id};`;
    },

    join(joins=[]) {
        let joinStatement = "";
        
        if (joins != []) {
            for (let join of joins) {    
                joinStatement += `INNER JOIN ${join.secondTable} ON ${join.firstTable}.${join.firstID}=${join.secondTable}.${join.secondID} `;
            }
        }
        
        return joinStatement;
    },

    filter(filter) {
        return filter ? `WHERE ${filter.param}=${filter.value} ` : "";
    }
}

/* == SQL CLASS == */
class JoeSQL {
    /* == CONSTRUCTOR == */
    constructor(config) {
        this.connection = null;
        this.config = config;
        return this;
    }

    /* == SUGAR FUNCTIONS == */
    // Connect to the DB
    connect = () => this.connection = mysql2.createConnection(this.config)

    // Close the DB connection
    end = () => this.connection.end()

    run = (statement, callback) => {
        console.log("\n\n\n\nstatement:", statement)
        this.connect().query(statement, callback);
            
        this.end();    
    }

    /* == DISPLAY FUNCTIONS == */
    // Display all rows of a given table
    displayTable(table, filter = null, joins = []) {
        let statement = STATEMENT.select(table);

        statement += STATEMENT.join(joins);
        statement += STATEMENT.filter(filter);

        this.run(statement, (_err, results) => {
            console.log("\n");
            console.table(results)
        })
    }

    // Display the sum of a column with joins and filters if you want
    displaySum(table, column, filter, joins) {
        let statement = STATEMENT.sum(column, table);

        statement += STATEMENT.join(joins)
        statement += STATEMENT.filter(filter);

        this.run(statement, (_error, result) => {
            console.log(`\nThat department's budget is $${result[0]["SUM(salary)"]}`)
        });
                }

    /* == DATA FUNCTIONS == */
    // Insert an object into a given table
    insert(table, obj) {
        const myKeys = Object.keys(obj).join(", ");
        const myValues = Object.values(obj).map(i => `"${i}"`).join(", ").replace('"null"', 'null');
    
        const statement = STATEMENT.insert(table, myKeys, myValues);

        this.run(statement);
    }

    // Update an object given it's name and table, and the change to be made
    update(table, id, changes) {
        let statement = STATEMENT.update(table);

        for (let change of changes) {
            statement += `${change.column} = ${change.value}, `;
        }

        statement = statement.slice(0, -2);
        statement += STATEMENT.where(id);

        this.run(statement);
    }

    // Delete an item out of the database
    delete(table, id) {
        const statement = STATEMENT.delete(table, id);

        this.run(statement);
    }

    // Reset the DB
    reset() {
        const schema = parseSqlFile(fs.readFileSync("db/schema.sql"));
        const seed = parseSqlFile(fs.readFileSync("db/seed.sql"));

        const queries = removeEmptyQueries([...schema, ...seed]);
        
        this.connect();

        queries.forEach(q => this.connection.query(q));

        this.end();
    }
}

export default JoeSQL;
