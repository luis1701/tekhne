const router = require('express').Router();

const {
    createRolesController
} = require('../controllers/rolesControllers')
const {validRoutesData} = require("../middlewares/middlewares");

router.post('/roles', validRoutesData, createRolesController);

module.exports = router;
