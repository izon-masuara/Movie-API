import { MongoClient } from 'mongodb'

let database;

const connect = async () => {
    let mongoClient;
    const uri = process.env.URI
    mongoClient = new MongoClient(uri)
    const db = mongoClient.db(process.env.DB_NAME)
    const collection = db.collection(process.env.DB_COLLECTION)
    database = collection
    try {
        await mongoClient.connect()
        console.log('Success connect')
    } catch (err) {
        console.log(err)
    }
}

export {
    connect,
    database
}
