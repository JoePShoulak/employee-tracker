const DNU = "do not update";

/* == HELPER FUNCTIONS == */
const createFilter = (id, column=null) => {
    let filterObj = {
        value: id
    }

    filterObj.param = column ? `${column}_id` : "id";

    return filterObj;
}

const createJoin = (firstTable, secondTable, firstID, secondID) => {
    return {
        firstTable: firstTable,
        secondTable: secondTable,
        firstID: firstID,
        secondID: secondID
    }
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

export {createFilter, createJoin, parseChanges}