const router = require('express').Router();

const {
    getProductsController,
    createProductController,
    getProductByIdController,
    deleteProductByIdController,
    putProductController
} = require('../controllers/productsControllers')
const { validProductData } = require('../middlewares/middlewares');

router.get('/products/', getProductsController);
router.post('/products', validProductData, createProductController);
router.get('/products/:id', getProductByIdController);
router.delete('/products/:id', deleteProductByIdController);
router.put('/products/:id', validProductData, putProductController);

module.exports = router;