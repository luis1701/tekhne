const {createRolesDB, getRoleByNameBD} = require("../dataAccess/roles");

exports.createRoles = async (data) => {
    const { name, scope } = data
    const createdRole = {
        name,
        scope
    };

    roleFound = await getRoleByNameBD(name);

    if(roleFound) return false;

    const res = await createRolesDB(createdRole)
    if (res) {
        return createdRole
    } else {
        return false
    }
}