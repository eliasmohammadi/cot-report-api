const MongoClient = require('mongodb').MongoClient

async function connectToDb() {
    let client = new MongoClient(process.env.CONNECTION_STRING)
    await client.connect()
    return client.db(process.env.DATABASE)
}

module.exports = {
    connectToDb
}
