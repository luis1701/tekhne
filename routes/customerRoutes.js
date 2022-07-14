const router = require('express').Router();

const { createCustomerController } = require('../controllers/customerControllers')
const { validCustomerData } = require('../middlewares/middlewares');

router.post('/customers', validCustomerData, createCustomerController);

module.exports = router;