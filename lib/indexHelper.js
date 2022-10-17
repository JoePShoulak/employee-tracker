const DNU = "do not update";

/* == HELPER FUNCTIONS == */
const createFilter = (value, column=null) => {
    let filterObj = { value };

    filterObj.param = column ? `${column}_id` : "id";

    return filterObj;
}

const createJoin = (firstTable, secondTable, firstID, secondID) => {
    return { firstTable, secondTable, firstID, secondID }
}

const parseChanges = (updateInfo) => {
    let changes = [];
    let myKeys = Object.keys(updateInfo).filter(k => k != "id");

    for (let key of myKeys) {
        if (updateInfo[key] != DNU) {
            changes = [...changes, {
                column: `${key}_id`,
                value: updateInfo[key]
            }];
        }
    }

    return changes;
}


const joins = {
    employeeRole: createJoin("employee", "role", "role_id", "id"),
    roleDepartment: createJoin("role", "department", "department_id", "id")
}

const filters = {
    manager(id) {
        return createFilter(id, "manager");
    },

    department(id) {
        return createFilter(id, "department");
    }
}

export {filters, joins, parseChanges}