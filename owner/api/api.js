const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017'
const dbName = 'ecomm';
const client = new MongoClient(url);
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/',async (req,res)=>{
    var result = await client.connect();
    var db = result.db(dbName);
    var collection = db.collection('user');
    var data = await collection.insertOne(req.body);
    res.send(data);
})

app.listen(5500);