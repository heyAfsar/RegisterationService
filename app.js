const express = require('express');
require('dotenv').config();

const dbConnect = require('./src/connection/connection');

const app = express();

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 9000;

app.get('/', async(req,res) => {
    res.send("hello world")
})
app.get('/getAllUsers', async(req,res) => {
    try{        
        let collection = dbConnect.getConnection();
        collection
            .find({}).toArray(function (err, result) {
                if (err) {
                  res.status(400).send("Error fetching listings!");
               } else {
                  res.json(result);
                }
              });

    }catch(err){
        res.status(500).send('Error ' + err)
    }
})

app.post('/', async(req,res) => {
    console.log(req.body)
    let collection = dbConnect.getConnection();
    const user = {
        name: req.body.name,
        dob: req.body.phone,
        email: req.body.email,
        phone: req.body.email,
        city: req.body.email,
        institute: req.body.email,
        qualification: req.body.email,
        gender: req.body.email
    }

    try{
        const a1 =  await collection.insertOne(user) 
        res.json(a1)
    }catch(err){
        res.send('Error'+ err)
    }
})
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})