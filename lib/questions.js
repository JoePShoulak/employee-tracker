const simpleQuestion = (title, message) => {
    return {
        name: title,
        type: "input",
        message: message
    }
}

const actionQuestions = [{
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
        "Exit"
    ]
}];

const employeeQuestions = [
    simpleQuestion("first_name", "What is the employee's first name?"),
    simpleQuestion("last_name", "What is the employee's last name?"),
    simpleQuestion("role_id", "What is the employee's role id?"),
    simpleQuestion("manager_id", "What is the employee's manager id?"),
]

export {actionQuestions, employeeQuestions};
