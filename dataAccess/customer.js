const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://localhost:27017/myProject';
const client = new MongoClient(url);

exports.createCustomerDB = async (customer) => {
	await client.connect();
	const collection = client.db().collection('customers');
	const res = await collection.insertOne(customer);
	return res;
}

exports.getCustomerByMail = async (email)	 => {
	await client.connect();
	const collection = client.db().collection('customers');
	const res = await collection.findOne({ email: email });
	return res;
}