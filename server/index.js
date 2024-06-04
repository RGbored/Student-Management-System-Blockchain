const express = require("express");
require('dotenv').config();
const app = express();
const formSchema = require('./model/formSchema');
const questionSchema = require('./model/questionSchema');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 5000;

app.use(express.json());
app.use(cors());

const connectionString = process.env.CONNECTION_STRING;

mongoose.connect(connectionString);

app.get('/', (req, res)=>{
    res.send(connectionString);
});

app.get('/questions', async (req, res) => {
    try {
      const questions = await questionSchema.find();
      res.status(200).json(questions);
    } catch (error) {
      console.error('Error fetching form data:', error);
      res.status(500).json({ error: 'An error occurred while fetching form data.' });
    }
  });

app.post('/add/problem', async (req, res)=>{
    try {
    // Extract form data from request body
    const formData = req.body;

    console.log(formData);

    // Create a new form instance
    const newForm = new questionSchema(formData);

    // Save the form instance to MongoDB
    const savedForm = await newForm.save();

    res.status(201).json(savedForm);
    } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ error: 'An error occurred while saving form data.' });
    }
});

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
});