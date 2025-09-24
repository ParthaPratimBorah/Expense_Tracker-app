// /server/routes/budgetRoutes.js

const express = require('express');
const router = express.Router();
const {
  getBudgets,
  addBudget,
  updateBudget,
  deleteBudget,
} = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');

// Apply the 'protect' middleware to all routes in this file
router.use(protect);

// Routes for getting all budgets and adding a new one
router.route('/').get(getBudgets).post(addBudget);

// Routes for updating and deleting a specific budget by its ID
router.route('/:id').put(updateBudget).delete(deleteBudget);

module.exports = router;