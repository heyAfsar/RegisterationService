require("dotenv").config();
const {connectToDatabase, closeConnection} = require("./connectToDataBase");
// const { MongoClient } = require("mongodb");

let dbConnection;
// var collectionObj;


const db = process.env.db;
const collection = process.env.collection;
const port = process.env.PORT || 9000;



module.exports = {
    "connect": async function(){
        connectToDatabase();
    },
    "getCollection": async function(){
        const {mongoClient} = await connectToDatabase();
        const db = mongoClient.db(process.env.db);
        return db.collection(process.env.collection);
    },
    "closeConnection": async function(){
        await client.close();
    }

}