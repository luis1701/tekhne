const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://localhost:27017/myProject';
const client = new MongoClient(url);

exports.createOrderDB = async (order) => {
	await client.connect();
	const collection = client.db().collection('orders');
	const res = await collection.insertOne(order)
	console.log(res)
	return res
}

exports.getOrdersDB = async () => {
	await client.connect();
	const collection = client.db().collection('orders');
	const res = await collection.find({})
	let result = []
	await res.forEach(element => {
		result.push({
			id: element._id,
			products: element.products,
			type: element.type,
			date: element.date,
			customer: element.customer
		})
	})
	return result
}

exports.getOrderByIdDB = async (id)	 => {
	await client.connect();
	const collection = client.db().collection('orders');
	const res = await collection.findOne({ _id: new ObjectId(id) })
	return res
}

exports.updateOrderDB = async (id, updatedOrder) => {
	await client.connect();
	const collection = client.db().collection('orders');
	const res = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { ...updatedOrder } })
	console.log(res)
	return res
}
