'use strict';

const mongoose = require('mongoose');
const User = require('./user.model');

const Schema = mongoose.Schema;

const budgetSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    lineItem: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Budget', budgetSchema);