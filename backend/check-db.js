/**
 * Database Checker Script
 * Run with: node check-db.js
 * 
 * This script connects to MongoDB and displays:
 * - Database statistics (counts)
 * - List of users
 * - Recent expenses
 * - Budgets
 */

const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Expense = require('./models/Expense');
const Budget = require('./models/Budget');

async function checkDatabase() {
  try {
    console.log('🔌 Connecting to MongoDB...\n');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    // Get counts
    const userCount = await User.countDocuments();
    const expenseCount = await Expense.countDocuments();
    const budgetCount = await Budget.countDocuments();

    // Display statistics
    console.log('📊 Database Statistics:');
    console.log('─'.repeat(40));
    console.log(`   Users:     ${userCount}`);
    console.log(`   Expenses:  ${expenseCount}`);
    console.log(`   Budgets:   ${budgetCount}`);
    console.log('─'.repeat(40));
    console.log();

    // Display users
    if (userCount > 0) {
      console.log('👤 Users:');
      console.log('─'.repeat(40));
      const users = await User.find().select('name email createdAt');
      users.forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.name}`);
        console.log(`      Email: ${user.email}`);
        console.log(`      Created: ${user.createdAt.toLocaleDateString()}`);
        console.log();
      });
    } else {
      console.log('👤 No users found\n');
    }

    // Display recent expenses
    if (expenseCount > 0) {
      console.log('💸 Recent Expenses (Last 5):');
      console.log('─'.repeat(40));
      const expenses = await Expense.find()
        .populate('user', 'name email')
        .sort({ date: -1 })
        .limit(5);
      
      expenses.forEach((expense, index) => {
        console.log(`   ${index + 1}. ${expense.title}`);
        console.log(`      Amount: $${expense.amount}`);
        console.log(`      Category: ${expense.category}`);
        console.log(`      Date: ${new Date(expense.date).toLocaleDateString()}`);
        console.log(`      User: ${expense.user?.name || 'Unknown'}`);
        console.log();
      });
    } else {
      console.log('💸 No expenses found\n');
    }

    // Display budgets
    if (budgetCount > 0) {
      console.log('📊 Budgets:');
      console.log('─'.repeat(40));
      const budgets = await Budget.find()
        .populate('user', 'name email')
        .sort({ category: 1 });
      
      budgets.forEach((budget, index) => {
        console.log(`   ${index + 1}. ${budget.category}`);
        console.log(`      Limit: $${budget.limit}`);
        console.log(`      User: ${budget.user?.name || 'Unknown'}`);
        console.log();
      });
    } else {
      console.log('📊 No budgets found\n');
    }

    // Close connection
    await mongoose.connection.close();
    console.log('✅ Database check complete!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Check if MongoDB is running');
    console.error('2. Verify MONGO_URI in .env file');
    console.error('3. Ensure .env file exists in backend folder');
    process.exit(1);
  }
}

// Run the check
checkDatabase();
