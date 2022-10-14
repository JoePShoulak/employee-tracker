import inquirer from "inquirer";
import { actionQuestions } from "./lib/questions.js";
import mysql2 from "mysql2";

import SECRETS from "./secrets.js";

const inqure = inquirer.prompt;

async function init() {
    let action = await inqure(actionQuestions);

    console.log(action);
}

// init();

/* == SANDBOX == */

// create the connection to database
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: SECRETS.SQL,
    database: 'employee_tracker'
});

connection.query(
    'DESCRIBE employee',
    function(err, results, fields) {
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    }
);