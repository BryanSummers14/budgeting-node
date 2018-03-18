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
        required: true,
        index: true
    },
    month: {
        type: String,
        required: true,
        index: true
    },
    year: {
        type: String,
        required: true,
        index: true
    }
}, { autoIndex: false });

module.exports = mongoose.model('MonthlyBudget', monthlyBudgetModel);
