const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require("./database").connect(); 

const app = express();
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb', extended: false }));
app.use(cors());

const Category = require('./userModel');

app.get("/", async (req, res) => {
  console.log("connected");
  res.status(201).json({ message: "connected" });
});

app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find(); 
    res.status(200).json({ categories }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred while fetching data" });
  }
});

app.get("/api/categories/:categoryId", async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/api/categories", async (req, res) => {
  const newUser = new Category({
    category: req.body.category,
    subcategory: req.body.subcategory
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({ message: "Data inserted successfully", user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred while inserting data" });
  }
});


app.delete("/delete/categories", async (req, res) => {
  const categoryIds = req.body.ids;

  try {
    const deletedCategories = await Category.deleteMany({ _id: { $in: categoryIds } });

    if (!deletedCategories) {
      return res.status(404).json({ message: "Categories not found" });
    }

    res.status(200).json({ message: "Categories deleted successfully", deletedCategories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred while deleting categories" });
  }
});


app.put("/api/categories/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { category, subcategory } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { category, subcategory },
      { new: true } 
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});