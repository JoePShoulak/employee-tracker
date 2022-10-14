import inquirer from "inquirer";

async function getAction() {
    return await inquirer.prompt({
        name: "action",
        type: "list",
        message: "Welcome! What would you like to do?",
        choices: [
            "View all Departments",
            "View all Roles",
            "View all Employees",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update an Employee Role",
        ]
    })
}

async function init() {
    let action = await getAction();
    
    console.log(action);
}

init();