const {successMessages, errorMessages} = require("../constants/messages");
const {createRoles} = require("../services/rolesServices");

exports.createRolesController = async (req, res, next) => {
    const { body } = req;
    const newRole = await createRoles(body)
    if (newRole) {
        res.status(201).json({ message: successMessages.roles.post, product: newRole });
    } else {
        return res.status(422).json({
            message: errorMessages.roles.post
        });
    }
}