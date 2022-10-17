/* == HELPER FUNCTIONS == */
const simpleQuestion = (message, name="id", def = null) => {
    let question = {
        name,
        message,
        type: "input",
    }

    if (def) question.default = def;

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
        simpleQuestion("What is the department's name?", "name")
    ],
    
    // Questions to define a role
    newRole: [
        simpleQuestion("What is the role's title?", "title"),
        simpleQuestion("What is the role's salary?", "salary"),
        simpleQuestion("What is the role's department_id?", "department_id"),
    ],

// Questions to define an employee
    newEmployee: [
        simpleQuestion("What is the employee's first name?", "first_name"),
        simpleQuestion("What is the employee's last name?", "last_name"),
        simpleQuestion("What is the employee's role id?", "role_id"),
        simpleQuestion("What is the employee's manager id?", "manager_id", "null")
    ],

    updateEmployee: [
        simpleQuestion("What is the ID of the employee you want to update?"),
        simpleQuestion("What is the ID of the role you want them to have?", "role", "do not update"),
        simpleQuestion("What is the ID of the manager you want them to have?", "manager", "do not update")
    ],

    employeesByManager: [
        simpleQuestion("What is the ID of the manager whose employees you'd like to see?")
    ],

    employeesByDepartment: [
        simpleQuestion("What is the ID of the department whose employees you'd like to see?")
    ],

    deleteDepartment: [
        simpleQuestion("What is the ID of the department you'd like to delete?")
    ],

    deleteRole: [
        simpleQuestion("What is the ID of the role you'd like to delete?")
    ],

    deleteEmployee: [
        simpleQuestion("What is the ID of the employee you'd like to delete?")
    ],

    departmentBudget: [
        simpleQuestion("What is the ID of the department whose budget you'd like to view?")
    ]
}

export default Questions;
