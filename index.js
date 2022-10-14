import inquirer from "inquirer";
import { actionQuestions } from "./lib/questions.js";
import mysql2 from "mysql2";

import SECRETS from "./secrets.js";

const inqure = inquirer.prompt;

const SQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: SECRETS.SQL,
    database: 'employee_tracker'
}

async function displayTable(table) {
    const db = mysql2.createConnection(SQL_CONFIG);
    
    db.query(`SELECT * FROM ${table}`, (err, results) => {
        console.table(results);
        console.log("\n\n\n\n\n\n\n\n") // TODO: Fix this buffer thing
    });
    
    db.end();
}

async function init() {
    let response = await inqure(actionQuestions);
    let action = response.action;
 
    while (action != "Exit") {
        switch (action) {
            case "View all Departments":
                displayTable("department");
                break;
            case "View all Roles":
                displayTable("role");
                break;
            case "View all Employees":
                displayTable("employee");
                break;
            case "Add a Department":
                console.log("Not yet implmented...") // TODO: Implement this
                break;
            case "Add a Role":
                console.log("Not yet implmented...") // TODO: Implement this
                break;
            case "Add an Employee":
                console.log("Not yet implmented...") // TODO: Implement this
                break;
            case "Update an Employee Role":
                console.log("Not yet implmented...") // TODO: Implement this
                break;
            default:
                break;
        }

        response = await inqure(actionQuestions);
        action = response.action;
    };
}

init();
