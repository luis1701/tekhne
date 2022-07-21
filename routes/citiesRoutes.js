const router = require('express').Router();

const {
    createCityController,
    getCitiesController,
    getCityByIdController,
} = require('../controllers/citiesControllers')

router.post('/cities', createCityController);
router.get('/cities', getCitiesController);
router.get('/cities/:id', getCityByIdController);

module.exports = router;