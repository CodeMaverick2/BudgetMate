const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
});

const budgetSchema = new mongoose.Schema({
    user: { type: String, required: true },
    name: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    expenses: [expenseSchema],
});

module.exports = mongoose.model('Budget', budgetSchema);
