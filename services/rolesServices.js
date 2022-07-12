const {createRolesDB} = require("../dataAccess/roles");

exports.createRoles = async (data) => {
    const { name, scope } = data
    const createdProduct = {
        name,
        scope
    };
    const res = await createRolesDB(createdProduct)
    if (res) {
        return createdProduct
    } else {
        return false
    }
}