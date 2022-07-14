const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017/myProject';
const client = new MongoClient(url);

exports.createCategoryDB = async (category) => {
	await client.connect();
	const collection = client.db().collection('categories');
	const res = await collection.insertOne(category)
	console.log(res)
	return res
}