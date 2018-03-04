'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const monthlyBudgetModel = new Schema({
    recurring: {
        type: Number,
        required: true
    },
    necessary: {
        type: Number,
        required: true
    },
    recreational: {
        type: Number,
        required: true 
    },
    _userID: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('MonthlyBudget', monthlyBudgetModel);
