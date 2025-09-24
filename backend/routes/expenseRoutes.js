// /server/routes/expenseRoutes.js

const express = require('express');
const router = express.Router();
const {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

// Apply the 'protect' middleware to all routes in this file
router.use(protect);

// Routes for getting all expenses and adding a new one
router.route('/').get(getExpenses).post(addExpense);

// Routes for updating and deleting a specific expense by its ID
router.route('/:id').put(updateExpense).delete(deleteExpense);

module.exports = router;