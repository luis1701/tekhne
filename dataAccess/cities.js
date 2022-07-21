const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://localhost:27017/myProject';
const client = new MongoClient(url);

exports.createCityDB = async (order) => {
	await client.connect();
	const collection = client.db().collection('cities');
	const res = await collection.insertOne(order)
	console.log(res)
	return res
}

exports.getCitiesDB = async () => {
	await client.connect();
	const collection = client.db().collection('cities');
	const res = await collection.find({})
	let result = []
	await res.forEach(city => {
		result.push({
			id: city._id,
			name: city.name,
			postalCode: city.postalCode,
			statesQuantity: city.statesQuantity,
		})
	})
	return result
}

exports.getCityByIdDB = async (id)	 => {
	await client.connect();
	const collection = client.db().collection('cities');
	const res = await collection.findOne({ _id: new ObjectId(id) })
	return res
}
