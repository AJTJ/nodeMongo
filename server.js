const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();

//our port
const port = 8000;

//allows express to process url encoded forms on its own.
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)

  const db = database.db("aaron_mongo_test");
  require('./app/routes')(app, db);
  
  app.listen(port, () => {
    console.log('we are live on ' + port);
  });
})