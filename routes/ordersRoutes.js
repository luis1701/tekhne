const router = require('express').Router();

const {
    createOrderController,
    getOrdersController,
    updateOrderController
} = require('../controllers/ordersControllers')
const { validOrderData } = require('../middlewares/middlewares');

router.post('/orders', validOrderData, createOrderController);
router.get('/orders', getOrdersController);
router.put('/orders/:id', validOrderData, updateOrderController);

module.exports = router;