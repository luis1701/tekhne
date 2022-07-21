const { createCityDB, getCitiesDB, getCityByIdDB } = require('../dataAccess/cities')

const RedisClient = require('../redis')

// const { createClient } = require('redis')
// const client = createClient();

// client.on('error', (err) => console.log('Redis Client Error', err));

const _ = require('lodash')

exports.createCity = async (data) => {
  try {
    const { name, postalCode, statesQuantity } = data
    // In this point we can be sure that data is right
    const createdCity = {
      name, postalCode, statesQuantity
    };
    const res = await createCityDB(createdCity)
    if (res) {
      return createdCity
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

exports.getCities = async () => {
  // Fetch cities from redis cache

  let citiesFromCache = await RedisClient.getCacheValue('cities');
  if (!citiesFromCache) {
    console.log("No encontro ciudades en cache y recupera de la db")
    const cities = await getCitiesDB()
    RedisClient.setCacheValue('cities', JSON.stringify(cities));
    citiesFromCache = cities
  } else {
    console.log("si encontro ciudades en cache")
    citiesFromCache = JSON.parse(citiesFromCache)
  }
  return citiesFromCache
}

exports.getCityById = async (id) => {
  const city = await getCityByIdDB(id)
  if (city) {
    return {
      id: city._id,
      name: city.name,
      postalCode: city.postalCode,
      statesQuantity: city.statesQuantity,
    }
  }
  return city
}
