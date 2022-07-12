const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://localhost:27017/myProject';
const client = new MongoClient(url);

exports.createRolesDB = async (roles) => {
    await client.connect();
    const collection = client.db().collection('roles');
    const res = await collection.insertOne(roles)
    console.log(res)
    return res
}