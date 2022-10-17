import inquirer from "inquirer";

import JoeSQL from "./lib/JoeSQL.js";
import Questions from "./lib/questions.js";
import CONFIG from "./config.js"

import { filters, joins, parseChanges } from "./lib/indexHelper.js";

const prompt = inquirer.prompt;
const sql = new JoeSQL(CONFIG.SQL);

let action;
let id;
let newDepartment, newRole, newEmployee;
let updateInfo;

// Perform the "main menu" query to identify the chosen user action
const performAction = async (action) => {
    switch (action) {
        case "View all Departments":
            sql.displayTable("department");
            break;
        case "View all Roles":
            sql.displayTable("role");
            break;
        case "View all Employees":
            sql.displayTable("employee");
            break;
        case "View Employees by Manager":
            id = (await prompt(Questions.employeesByManager)).id;
            sql.displayTable("employee", filters.manager(id));
            break;
        case "View Employees by Department":
            id = (await prompt(Questions.employeesByDepartment)).id;
            sql.displayTable("employee", filters.department(id), [joins.employeeRole]);
            break;
        case "Add a Department":
            newDepartment = await prompt(Questions.newDepartment);
            sql.insert("department", newDepartment);
            break;
        case "Add a Role":
            newRole = await prompt(Questions.newRole);
            sql.insert("role", newRole);
            break;
        case "Add an Employee":
            newEmployee = await prompt(Questions.newEmployee);
            sql.insert("employee", newEmployee);
            break;
        case "Update an Employee":
            updateInfo = await prompt(Questions.updateEmployee);
            sql.update("employee", updateInfo.id, parseChanges(updateInfo));
            break;
        case "Delete a Department":
            id = (await prompt(Questions.deleteDepartment)).id;
            sql.delete("department", id);
            break;
        case "Delete a Role":
            id = (await prompt(Questions.deleteRole)).id;
            sql.delete("role", id);
            break;
        case "Delete an Employee":
            id = (await prompt(Questions.deleteEmployee)).id;
            sql.delete("employee", id);
            break;
        case "View Budget of a Department":
            id = (await prompt(Questions.departmentBudget)).id;
            sql.displaySum("employee", "salary", filters.department(id), [ joins.employeeRole, joins.roleDepartment ]);
            break;
        default:
            break;
    }
}

/* == MAIN == */
const init = async () => {
    while (action != "Exit") {
        action = (await prompt(Questions.mainAction)).action;
        await performAction(action);
    }
}

init();
