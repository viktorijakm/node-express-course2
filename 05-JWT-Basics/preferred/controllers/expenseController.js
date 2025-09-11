//CRUD for expenses

const Expense = require("../models/Expense");

// POST /api/v1/expenses
const createExpense = async (req, res) => {
  const { title, amount, category, date } = req.body;

  if (!title || !amount || !category || !date) {
    return res.status(400).json({ msg: "Please provide all values" });
  }

  const expense = await Expense.create({
    title,
    amount,
    category,
    date,
    user: req.user.username, // from JWT
  });

  res.status(201).json({ expense });
};

// GET /api/v1/expenses
const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ user: req.user.username });
  res.status(200).json({ expenses });
};

//Delete expense by id
const deleteExpense = async (req, res) => {
  const { id } = req.params;

  const expense = await Expense.findOne({ _id:id, user: req.user.username  });

  if (!expense) {
    return res.status(404).json({ msg: "Expense not found" });
  }

  await expense.remove();
  res.status(200).json({ msg: "Expense deleted" });
};
module.exports = { createExpense, getExpenses, deleteExpense };
