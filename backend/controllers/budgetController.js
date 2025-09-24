// /server/controllers/budgetController.js

const Budget = require('../models/Budget');

/**
 * @desc    Get all budgets for a user
 * @route   GET /api/budgets
 * @access  Private
 */
const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Add a new budget
 * @route   POST /api/budgets
 * @access  Private
 */
const addBudget = async (req, res) => {
  const { category, limit } = req.body;

  try {
    const newBudget = new Budget({
      user: req.user.id,
      category,
      limit,
    });

    const budget = await newBudget.save();
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Update a budget
 * @route   PUT /api/budgets/:id
 * @access  Private
 */
const updateBudget = async (req, res) => {
  try {
    let budget = await Budget.findById(req.params.id);
    if (!budget) return res.status(404).json({ message: 'Budget not found' });

    // Make sure the logged-in user owns the budget
    if (budget.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    budget = await Budget.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Delete a budget
 * @route   DELETE /api/budgets/:id
 * @access  Private
 */
const deleteBudget = async (req, res) => {
  try {
    let budget = await Budget.findById(req.params.id);
    if (!budget) return res.status(404).json({ message: 'Budget not found' });

    // Make sure the logged-in user owns the budget
    if (budget.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Budget.findByIdAndDelete(req.params.id);
    res.json({ message: 'Budget removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getBudgets,
  addBudget,
  updateBudget,
  deleteBudget,
};