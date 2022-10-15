import inquirer from "inquirer";

import JoeSQL from "./lib/JoeSQL.js";
import Questions from "./lib/questions.js";

const prompt = inquirer.prompt;
const sql = new JoeSQL();

/* == HELPERS == */
// Add a new object to the related table
const addNew = async (table) => {
    // Get the data from the user via Inquirer
    let objectData = await prompt(Questions[table]);

    // Update the object with a new ID that isn't in use
    objectData.id = (await sql.maxID(table)) + 1;
    console.log(objectData);

    // Insert the object into the database
    sql.insert(table, objectData);
}

// TODO: Rename this function
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
            await addNew("department");
            break;
        case "Add a Role":
            await addNew("role");
            break;
        case "Add an Employee":
            await addNew("employee");
            break;
        case "Update an Employee Role":
            console.log("Not yet implemented..."); // TODO: Implement this
            break;
        default:
            break;
    }
}

/* == MAIN == */
const init = async () => {
    let action;

    while (action != "Exit") {
        action = (await prompt(Questions.main)).action;
        await performAction(action);
    }
}

init();
