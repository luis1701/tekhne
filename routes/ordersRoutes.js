const router = require('express').Router();

const {
    createOrderController,
    getOrdersController,
    updateOrderController,
    getOrderByIdController
} = require('../controllers/ordersControllers')
const { validOrderData } = require('../middlewares/middlewares');

router.post('/orders', validOrderData, createOrderController);
router.get('/orders', getOrdersController);
router.get('/orders/:id', getOrderByIdController);
router.put('/orders/:id', validOrderData, updateOrderController);

module.exports = router;