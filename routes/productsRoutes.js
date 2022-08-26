const router = require('express').Router();

const {
    getProductsController,
    createProductController,
    getProductByIdController,
    deleteProductByIdController,
    putProductController
} = require('../controllers/productsControllers')
const { validProductData } = require('../middlewares/middlewares');
const { validateToken } = require('../middlewares/validateToken');

router.get('/products/', validateToken, getProductsController);
router.post('/products', validateToken, validProductData, createProductController);
router.get('/products/:id', validateToken, getProductByIdController);
router.delete('/products/:id', validateToken, deleteProductByIdController);
router.put('/products/:id', validateToken, validProductData, putProductController);

module.exports = router;