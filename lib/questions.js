/* == HELPER FUNCTIONS == */
const simpleQuestion = (title, message) => {
    return {
        name: title,
        type: "input",
        message: message
    }
}

/* == QUESTIONS == */
const Questions = {
    // Main logic questions
    main: [{
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
    }],
    
    // Questions to define a department
    department: [
        simpleQuestion("name", "What is the department's name?")
    ],
    
    // Questions to define a role
    role: [
        simpleQuestion("title", "What is the role's title?"),
        simpleQuestion("salary", "What is the role's salary?"),
        simpleQuestion("department_id", "What is the role's department_id?"),
    ],

// Questions to define an employee
    employee: [
        simpleQuestion("first_name", "What is the employee's first name?"),
        simpleQuestion("last_name", "What is the employee's last name?"),
        simpleQuestion("role_id", "What is the employee's role id?"),
        {
            name: "manager_id",
            type: "input",
            message: "What is the employee's manager id?",
            default: "null"
        }
    ]
}

export default Questions;
