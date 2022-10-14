import inquirer from "inquirer";
import mysql2 from "mysql2";

import { actionQuestions, employeeQuestions } from "./lib/questions.js";
import SECRETS from "./secrets.js";

const prompt = inquirer.prompt;

const SQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: SECRETS.SQL,
    database: 'employee_tracker'
}

const displayTable = (_err, results) => {
    console.log("\n");
    console.table(results);
}

// Display a table after querying it
// TODO: Break this into two functions, one that async returns a query, and another that renders the data
const getTable = (table, callback) => {
    const connection = mysql2.createConnection(SQL_CONFIG);
    
    connection.query(`SELECT * FROM ${table}`, (_err, results) => {
        connection.end();

        callback(_err, results);
    });
}

// TODO: Rename this function
// Perform the "main menu" query to identify the chosen user action
const performAction = async (action) => {
    switch (action) {
        case "View all Departments":
            getTable("department", displayTable);
            break;
        case "View all Roles":
            getTable("role", displayTable);
            break;
        case "View all Employees":
            getTable("employee", displayTable);
            break;
        case "Add a Department":
            console.log("Not yet implmented..."); // TODO: Implement this
            break;
        case "Add a Role":
            console.log("Not yet implmented..."); // TODO: Implement this
            break;
        case "Add an Employee":
            console.log("Not yet implmented..."); // TODO: Implement this
            // let employeeData = await prompt(employeeQuestions);
            // console.log(employeeData);
            break;
        case "Update an Employee Role":
            console.log("Not yet implmented..."); // TODO: Implement this
            break;
        default:
            break;
    }
}

 const init = async () => {
    let action;

    while (action != "Exit") {
        action = (await prompt(actionQuestions)).action;
        performAction(action);
    }
}

init();
