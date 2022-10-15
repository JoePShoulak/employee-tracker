import inquirer from "inquirer";

import JoeSQL from "./lib/JoeSQL.js";
import Questions from "./lib/questions.js";

import { createFilter, createJoin, parseChanges } from "./lib/indexHelper.js";

const prompt = inquirer.prompt;
const sql = new JoeSQL();

const joins = {
    employeeRole: createJoin("employee", "role", "role_id", "id"),
    roleDepartment: createJoin("role", "department", "department_id", "id")
}

// Perform the "main menu" query to identify the chosen user action
const performAction = async (action) => {
    let id;

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
            sql.displayTable("employee", createFilter(id, "manager"));
            break;
        case "View Employees by Department":
            id = (await prompt(Questions.employeesByDepartment)).id;
            sql.displayTable("employee", createFilter(id, "department"), [joins.employeeRole]);
            break;
        case "Add a Department":
            let newDepartment = await prompt(Questions.newDepartment);
            sql.insert("department", newDepartment);
            break;
        case "Add a Role":
            let newRole = await prompt(Questions.newRole);
            sql.insert("role", newRole);
            break;
        case "Add an Employee":
            let newEmployee = await prompt(Questions.newEmployee);
            sql.insert("employee", newEmployee);
            break;
        case "Update an Employee":
            let updateInfo = await prompt(Questions.updateEmployee);
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
            sql.displaySum("employee", "salary", createFilter(id, "department"), [ joins.employeeRole, joins.roleDepartment ]);
            break;
        default:
            break;
    }
}

/* == MAIN == */
const init = async () => {
    let action;

    while (action != "Exit") {
        action = (await prompt(Questions.mainAction)).action;
        await performAction(action);
    }
}

init();
