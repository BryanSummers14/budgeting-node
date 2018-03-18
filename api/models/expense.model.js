'use strict';

const mongoose = require('mongoose');
const User = require('./user.model');

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    _userID: {
        type: String,
        required: true,
        index: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: new Date().toISOString(),
        index: true
    }
}, { autoIndex: false });

module.exports = mongoose.model('Expense', expenseSchema);