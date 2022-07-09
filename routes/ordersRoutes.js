const router = require('express').Router();

const {
    createOrderController,
    getOrdersController,
    updateOrderController,
    getOrderByIdController,
    deleteOrderByIdController
} = require('../controllers/ordersControllers')
const { validOrderData } = require('../middlewares/middlewares');

router.post('/orders', validOrderData, createOrderController);
router.get('/orders', getOrdersController);
router.get('/orders/:id', getOrderByIdController);
router.put('/orders/:id', validOrderData, updateOrderController);
router.delete('/orders/:id', deleteOrderByIdController);

module.exports = router;