require("dotenv").config();
const { MongoClient } = require("mongodb");

const user = encodeURIComponent(process.env.user);
const pw = encodeURIComponent(process.env.pw);
const cluster = process.env.cluster;
let uri = `mongodb+srv://${user}:${pw}@${cluster}.8a75gbp.mongodb.net`;
console.log(uri);
let mongoClient;

module.exports = {
    "connectToDatabase": async function(){
        try {
            if(mongoClient)
                return {mongoClient};
            console.log('Connecting to MongoDB Atlas cluster...');
            mongoClient = await (new MongoClient(uri)).connect();        
            console.log('Successfully connected to MongoDB Atlas!');
            return mongoClient;
        } catch (error) {
            console.log(error)
        }
    },
    "closeConnection": async function(){
        try {
            if(!mongoClient)
                return 'No Active Connections';  
            mongoClient.close();     
            return console.log('Connection Terminated');  
        } catch (error) {
            console.log(error)
        }
    }
}