const router = require('express').Router();

const { createCategoriesController } = require('../controllers/categoriesControllers')
const { validCategoriesData } = require('../middlewares/middlewares');

router.post('/categories', validCategoriesData, createCategoriesController);

module.exports = router;