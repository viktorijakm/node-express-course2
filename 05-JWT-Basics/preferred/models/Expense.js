//MongoDB schema for expenses

const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  title: { 
    type: String,
     required: true 
    },
  amount: { 
    type: Number, 
    required: true
   },
  category: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true
   },
  user: { 
    type: String, 
    required: true }, // store user ID from JWT
});

module.exports = mongoose.model("Expense", ExpenseSchema);
