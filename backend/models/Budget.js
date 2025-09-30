const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      trim: true,
    },
    limit: {
      type: Number,
      required: [true, 'Please add a budget limit'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Budget', BudgetSchema);