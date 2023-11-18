// backend/index.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const categorySchema = new mongoose.Schema({
  category: String,
  subcategory: String,
});

const Category = mongoose.model('Category', categorySchema);

app.post('/api/categories', async (req, res) => {
  try {
    const { category, subcategory } = req.body;
    const newCategory = new Category({ category, subcategory });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
