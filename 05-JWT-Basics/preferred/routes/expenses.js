//routes protected by JWT middleware

const express = require("express");
const router = express.Router();
const { createExpense, getExpenses, deleteExpense } = require("../controllers/expenseController");
const authMiddleware = require("../middleware/auth");

router.route("/")
  .post(authMiddleware, createExpense)
  .get(authMiddleware, getExpenses);

router.route("/:id")
  .delete(authMiddleware, deleteExpense);  

module.exports = router;
