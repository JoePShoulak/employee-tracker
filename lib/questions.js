/* == HELPER FUNCTIONS == */
const simpleQuestion = (title, message, def=null) => {
    let question = {
        name: title,
        type: "input",
        message: message,
    }

    if (def) {
        question.default = def;
    }

    return question;
}

/* == QUESTIONS == */
const Questions = {
    // Main logic questions
    mainAction: [{
        name: "action",
        type: "list",
        message: "Welcome! What would you like to do?",
        choices: [
            "View all Departments",
            "View all Roles",
            "View all Employees",
            "View Employees by Manager",
            "View Employees by Department",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update an Employee",
            "Delete a Department",
            "Delete a Role",
            "Delete an Employee",
            "View Budget of a Department",
            "Exit"
        ]
    }],
    
    // Questions to define a department
    newDepartment: [
        simpleQuestion("name", "What is the department's name?")
    ],
    
    // Questions to define a role
    newRole: [
        simpleQuestion("title", "What is the role's title?"),
        simpleQuestion("salary", "What is the role's salary?"),
        simpleQuestion("department_id", "What is the role's department_id?"),
    ],

// Questions to define an employee
    newEmployee: [
        simpleQuestion("first_name", "What is the employee's first name?"),
        simpleQuestion("last_name", "What is the employee's last name?"),
        simpleQuestion("role_id", "What is the employee's role id?"),
        simpleQuestion("manager_id", "What is the employee's manager id?", "null")
    ],

    updateEmployee: [
        simpleQuestion("id", "What is the ID of the employee you want to update?"),
        simpleQuestion("role", "What is the ID of the role you want them to have?", "do not update"),
        simpleQuestion("manager", "What is the ID of the manager you want them to have?", "do not update")
    ],

    employeesByManager: [
        simpleQuestion("id", "What is the ID of the manager whose employees you'd like to see?")
    ],

    employeesByDepartment: [
        simpleQuestion("id", "What is the ID of the department whose employees you'd like to see?")
    ],

    deleteDepartment: [
        simpleQuestion("id", "What is the ID of the department you'd like to delete?")
    ],

    deleteRole: [
        simpleQuestion("id", "What is the ID of the role you'd like to delete?")
    ],

    deleteEmployee: [
        simpleQuestion("id", "What is the ID of the employee you'd like to delete?")
    ],

    departmentBudget: [
        simpleQuestion("id", "What is the ID of the department whose budget you'd like to view?")
    ]
}

export default Questions;
