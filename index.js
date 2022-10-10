const express = require('express');
require('dotenv').config();

// const dbConnect = require('./src/connection/connection');
const dbConnect = require('./src/connection/connection');

const app = express();

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 9000;
dbConnect.connect();
app.get('/', async(req,res) => {
    res.json({"message":"hello world"})
})
app.get('/getAllUsers', async(req,res) => {
    try{        
        let collection = await dbConnect.getCollection();
        const result = await collection
            .find({}).toArray();

        res.status(200).json(result)

    }catch(err){
        res.status(500).send('Error ' + err)
    }
})

app.post('/register', async(req,res) => {
    console.log(req.body)
    let collection = await dbConnect.getCollection();
    const user = {
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
        const a1 =  await collection.insertOne(user) 
        res.status(201).json(user)
    }catch(err){
        res.status(500).send('Error'+ err)
    }
})
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})