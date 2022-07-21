const { createCity, getCities, getCityById } = require('../services/citiesServices')
const { successMessages, errorMessages } = require('../constants/messages')

exports.createCityController = async (req, res, next) => {
    const { body } = req;
    const newCity = await createCity(body)
    if (newCity) {
      res.status(201).json({ message: successMessages.cities.post, city: newCity });
    } else {
      return res.status(422).json({
        message: errorMessages.cities.post
      });
    }
}

exports.getCitiesController = async (req, res, next) => {
  const cities = await getCities()
  res.status(200).json({ message: successMessages.cities.get,  cities: cities });
}

exports.getCityByIdController = async (req, res, next) => {
  const { params } = req;
  const { id } = params;
  const city = await getCityById(id)
  if (city) {
    return res.status(200).json({ city: city });
  } else {
    return res.status(422).json({
      message: 'Invalid input, please enter a valid id.'
    });
  }
}
