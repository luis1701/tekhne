const router = require('express').Router();

const {
    createRolesController
} = require('../controllers/rolesControllers')
const {validRoleData} = require("../middlewares/middlewares");

router.post('/roles', validRoleData, createRolesController);

module.exports = router;
