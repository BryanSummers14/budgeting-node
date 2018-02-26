'use strict';

const jwt = require('jsonwebtoken');
const config = require('../../config');
const Budget = require('../models/budget.model');

exports.getAllLineItems = async (req, res) => {
    const _authToken = jwt.decode(req.get('Authorization'));
    const lineItems = await Budget.find({ user: _authToken._id });
    const allItems = Array.from(lineItems);
    const total = allItems.reduce((_prev, cur) => {
        return _prev + cur.amount;
    }, 0);
    res.status(204).json({ total: total });
}

exports.addLineItem = async (req, res) => {
    const _authToken = jwt.decode(req.get('Authorization'));
    const newBudgetItem = new Budget({
        user: _authToken._id,
        lineItem: 'New Item',
        amount: Math.floor(Math.random() * (1700 - 0 + 1)) + 0
    });
    try {
        const _budget = await newBudgetItem.save();
        res.status(201).json({ ..._budget._doc });
    } catch (err) {
        res.status(500).json({...err});
    }
}

