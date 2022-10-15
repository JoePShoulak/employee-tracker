import inquirer from "inquirer";

import JoeSQL from "./lib/JoeSQL.js";
import Questions from "./lib/questions.js";

const prompt = inquirer.prompt;
const sql = new JoeSQL();

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
        case "Add a Department":
            sql.insert("department", await prompt(Questions.newDepartment));
            break;
        case "Add a Role":
            sql.insert("role", await prompt(Questions.newRole));
            break;
        case "Add an Employee":
            sql.insert("employee", await prompt(Questions.newEmployee));
            break;
        case "Update an Employee":
            let updateInfo = await prompt(Questions.updateEmployee);

            const DNU = "do not update";

            let changes = [];

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

            sql.update("employee", updateInfo.id, changes);
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
