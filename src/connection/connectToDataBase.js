require("dotenv").config();
const { MongoClient } = require("mongodb");

const user = encodeURIComponent(process.env.user);
const pw = encodeURIComponent(process.env.pw);
const cluster = process.env.cluster;
let uri = `mongodb+srv://${user}:${pw}@${cluster}.8a75gbp.mongodb.net`;
console.log(uri);
let mongoClient, connection;

module.exports = {
    "connectToDatabase": async function(){
        try {
            if(connection)
                return {connection};
            console.log('Connecting to MongoDB Atlas cluster...');
            mongoClient = new MongoClient(uri)
            connection = await mongoClient.connect();
            console.log('Successfully connected to MongoDB Atlas!');
            return connection;
        } catch (error) {
            console.log(error)
        }
    },
    "getCollection": async function(db, collectionName){
        try {
            const collection = mongoClient.db(db || process.env.db)
                    .collection(collectionName || process.env.collection);  

            return collection;            
        } catch (error) {
            return error
        }
    },
    "closeConnection": async function(){
        try {
            if(!mongoClient)
                return 'No Active Connections';  
            
            await mongoClient.close();   
            mongoClient = connection = undefined;
            console.log('Connection Terminated')  
            return 'Connection Terminated'; 

        } catch (error) {
            console.log(error)
        }
    }
}