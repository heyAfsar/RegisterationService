const express = require('express');
require('dotenv').config();

const {connectToDatabase, getCollection, closeConnection} = require("./src/connection/connectToDataBase");


const app = express();

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 9000;
connectToDatabase();



app.get('/', async(req,res) => {
    res.json({"message":"hello world"})
})
app.get('/close', async(req,res) => {
    try {
        var response = await closeConnection();
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send('Error:'+ error);
    }
    
})
app.get('/connect', async(req,res) => {
    try{                
        connectToDatabase();
        res.status(200).send('Connected to Database')

    }catch(err){
        res.status(500).send('Error ' + err )
    }
})

app.get('/getAllUsers', async(req,res) => {
    try{
        const collection = await getCollection();
        const result = await collection.find({})
                .toArray();

        res.status(200).json(result)

    }catch(err){
        res.status(500).send('Error ' + err+ "\n Try Reconnecting to the Database")
    }
})

app.post('/register', async(req,res) => {
    console.log(req.body)
    const collection = await getCollection();
    let user = {
        name: req.body.name,
        dob: req.body.phone,
        email: req.body.email,
        phone: req.body.phone,
        city: req.body.city,
        institute: req.body.institute,
        qualification: req.body.qualification,
        gender: req.body.gender
    }

    try{
        await collection.insertOne(user);
        res.status(201).json(user)
    }catch(err){
        res.status(500).send('Error'+ err)
    }
})
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})