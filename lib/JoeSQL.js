// I'd name this SQLHelper but it'd be too long. 
// I'd name it MySQL but... well, you know. 
import mysql2 from "mysql2";
import SECRETS from "../secrets.js";

/* == MISC == */
const SQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: SECRETS.SQL,
    database: 'employee_tracker'
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
    displayTable(table) {
        this.connect().query(`SELECT * FROM ${table}`, (_err, results) => {
            this.end();

            console.log("\n");
            console.table(results)
        })
    }

    // Insert an object into a given table
    insert(table, obj) {
        const myKeys = Object.keys(obj).join(", ");
        const myValues = Object.values(obj).join(", ");
    
        const statement = `INSERT INTO ${table} (${myKeys}) VALUES (${myValues})`;

        console.log(statement) // TODO: Wire this up when ready
        // this.connect().query(statement);
        // this.end();
    }

    // Get the max primary id of a given table
    async maxID(table) {
        const connection = this.connect()

        connection.query(`SELECT MAX(ID) FROM ${table}`, (_err, results) => {
            this.end();
    
            maxID = results[0]['MAX(ID)'] // TODO: How do I return maxID?
        });
    }
}

export default JoeSQL;
