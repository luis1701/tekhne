const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://localhost:27017/myProject';
const client = new MongoClient(url);

exports.createProductDB = async (product) => {
	await client.connect();
	const collection = client.db().collection('products');
	const res = await collection.insertOne(product)
	console.log(res)
	return res
}

exports.getProductsDB = async () => {
	await client.connect();
	const collection = client.db().collection('products');
	const res = await collection.find({})
	let result = []
	await res.forEach(element => {
		result.push({ id: element._id, title: element.title, price: element.price})
	})
	return result
}

exports.getProductByIdDB = async (id)	 => {
	await client.connect();
	const collection = client.db().collection('products');
	const res = await collection.findOne({ _id: new ObjectId(id) })
	return res
}

exports.deleteProductByIdDB = async (id) => {
	await client.connect();
	const collection = client.db().collection('products');
	const res = await collection.deleteOne({ _id: new ObjectId(id) })
	console.log(res)
	return res
}

exports.updateProductDB = async (id, updatedProduct) => {
	await client.connect();
	const collection = client.db().collection('products');
	const res = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { ...updatedProduct } })
	console.log(res)
	return res
}
