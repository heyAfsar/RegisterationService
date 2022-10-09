require("dotenv").config();
const { MongoClient } = require("mongodb");

let dbConnection;
var collectionObj;

const user = encodeURIComponent(process.env.user);
const pw = encodeURIComponent(process.env.pw);
const cluster = process.env.cluster;
const db = process.env.db;
const collection = process.env.collection;
const port = process.env.PORT || 9000;

let uri = `mongodb+srv://${user}:${pw}@${cluster}.8a75gbp.mongodb.net`;
console.log(uri);
const client = new MongoClient(uri);
async function run() {
  try {
    console.log('Connecting to MongoDB Atlas cluster...');
    await client.connect();
    console.log('Successfully connected to MongoDB Atlas!');
    dbConnection = client.db(db);
} finally {
      collectionObj = dbConnection.collection(collection)
  }
}
run().catch(console.dir);

module.exports = {
    "connect": async function(){
        run().catch(console.dir);
    },
    "getConnection": function(){
        return dbConnection.collection(collection);
    },
    "closeConnection": async function(){
        await client.close();
    }

}