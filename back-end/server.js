const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/creative4', {
  useNewUrlParser: true
});

const itemSchema = new mongoose.Schema({
  id: String,
  string: String,
  author: String,
  date: String,
});

itemSchema.virtual('key')
  .get(function() {
    return this._id.toHexString();
  });

  itemSchema.set('toJSON', {
  virtuals: true
});

const questionSchema = new mongoose.Schema({
  string: String,
  author: String,
  date: String,
});

questionSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });

  questionSchema.set('toJSON', {
  virtuals: true
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);
const Question = mongoose.model('Question', questionSchema);


app.post('/api/items', async (req, res) => {
  const item = new Item({
    id: req.body.id,
    author: req.body.author,
    date: req.body.date,
    string: req.body.description,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/questions', async (req, res) => {
  const query = new Question({
    author: req.body.author,
    date: req.body.date,
    string: req.body.description,
  });
  try {
    await query.save();
    res.send(query);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/questions', async (req, res) => {
  try {
    let query = await Question.find();
    res.send(query);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/questions/:id', async (req, res) => {
  try {
    await Question.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/items/:id', async (req, res) => {
  try {
    let item = await Item.findOne({_id: req.params.id});
    item.author = req.body.author;
    item.date = req.body.date;
    item.string = req.body.string;
    item.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/questions/:id', async (req, res) => {
  try {
    let question = await Question.findOne({_id: req.params.id});
    question.author = req.body.author;
    question.date = req.body.date;
    question.string = req.body.string;
    question.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3001, () => console.log('Server listening on port 3001!'));
