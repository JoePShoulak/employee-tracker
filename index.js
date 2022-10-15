import inquirer from "inquirer";

import JoeSQL from "./lib/JoeSQL.js";
import Questions from "./lib/questions.js";

const prompt = inquirer.prompt;
const sql = new JoeSQL();

/* == HELPER FUNCTIONS == */
const filter = (column, id) => {
    return {
        param: `${column}_id`,
        value: id
    }
}

const join = (secondTable, firstID, secondID) => {
    return {
        secondTable: secondTable,
        firstID: firstID,
        secondID: secondID
    }
}

const parseChanges = (updateInfo) => {
    let changes = [];

    const DNU = "do not update";


    if (updateInfo.role != DNU) {
        changes = [...changes, {
            column: "role_id",
            value: updateInfo.role
        }];
    }

    if (updateInfo.manager != DNU) {
        changes = [...changes, {
            column: "manager_id",
            value: updateInfo.manager
        }];
    }

    return changes;
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
            sql.displayTable("employee", null, filter("manager", id));
            break;
        case "View Employees by Department":
            id = (await prompt(Questions.employeesByDepartment)).id;
            sql.displayTable("employee", join("role", "role_id", "id"), filter("department", id));
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
        case "Delete a Department":
            id = await prompt(Questions.deleteDepartment);
            sql.delete("department", id);
            break;
        case "Delete a Role":
            id = await prompt(Questions.deleteRole);
            sql.delete("role", id);
            break;
        case "Delete an Employee":
            id = (await prompt(Questions.deleteEmployee)).id;
            sql.delete("employee", id);
            break;
        case "Update an Employee":
            let updateInfo = await prompt(Questions.updateEmployee);
            sql.update("employee", updateInfo.id, parseChanges(updateInfo));
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
