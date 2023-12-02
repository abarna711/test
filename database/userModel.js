// categoryModel.js

// const mongoose = require('mongoose');

// const categorySchema = new mongoose.Schema({
//   category: String,
//   subcategory: String,
// });

// const Category = mongoose.model("Category", categorySchema);


// module.exports = Category;
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  category: {type:String,require:true,unique: true},
  subcategory: {type:String,require:true,unique: true}
});

module.exports = mongoose.model('Category', userSchema);
