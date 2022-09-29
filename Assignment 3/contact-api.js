const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
ObjectId = require('mongodb').ObjectID;

const app = express()
const port = 3000
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mhk51:VaLmjS1nXI4ylDME@cluster0.v6tqheq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const database = client.db('contactsDatabase');
const contactsCollection = database.collection('contactsCollections');


let contacts = contactsCollection.find({});



  app.post('/contact', async (req, res) => {
    const Contact = req.body;
    
    await contactsCollection.insertOne(Contact);
    console.log(Contact);

    res.send('Contact is added to the database');
});

app.get('/contact', async (req, res) => {
    console.log("Starting...");
    contacts =  await contactsCollection.find().toArray();
    console.log(contacts)
    res.json(contacts);
});

app.get('/contact/:id', async (req, res) => {
  let id = req.params.id;
  let contact = await contactsCollection.findOne({_id:ObjectId(id)});
  if(contact != null){
    res.json(contact);
  }
  else{
  res.status(404).send('Conact not found');
  }
});

app.post('/contact/:id', async (req, res) => {
  let id = req.params.id;
  console.log(id);
  const newContact = req.body;
  await contactsCollection.deleteOne({_id:ObjectId(id)});
  contactsCollection.insertOne(newContact);
  res.send('Contact is Edited');
});


app.delete('/contact/:id', async (req, res) => {
  let id = req.params.id;
  console.log(id)
  await contactsCollection.deleteOne({_id:ObjectId(id)});
  res.send('Contact is deleted');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));