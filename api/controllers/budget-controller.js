'use strict';

const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../../config');

const Expense = require('../models/expense.model');
const MonthlyBudget = require('../models/monthly-budget.model');

exports.monthlySpentTotal = async (req, res) => {
    const _authToken = jwt.decode(req.get('Authorization'));
    try {
        const monthlyBudget = await MonthlyBudget.findOne({ _userID: _authToken._id, month: moment().month(), year: moment().year() });
        const lineItems = await Expense.find({ _userID: _authToken._id, date: { $gt: moment().startOf('month').toISOString(), $lt: moment().endOf('month').toISOString() }});
        const allItems = Array.from(lineItems);
        const total = allItems.reduce((_prev, cur) => {
            return _prev + cur.amount;
        }, 0);
        res.status(200).json({ total, expenses: allItems, monthlyBudget });
    } catch (err) {
        res.status(500).json({ ...err });
    }
}

exports.addLineItem = async (req, res) => {
    try {
    const _authToken = jwt.decode(req.get('Authorization'));
    const newExpenseItem = new Expense({
        _userID: _authToken._id,
        type: req.body.type,
        description: req.body.description,
        amount: req.body.amount
    });
        const _expense = await newExpenseItem.save();
        res.status(201).json({ ..._expense._doc });
    } catch (err) {
        res.status(500).json({...err});
    }
}

exports.setMonthlyBudget = async (req, res) => {
    const _authToken = jwt.decode(req.get('Authorization'));
    const now = moment();
    const { recurring, necessary, recreational } = { ...req.body };
    try {
        const monthlyBudget = new MonthlyBudget({ 
            _userID: _authToken._id,
            recurring,
            necessary,
            recreational,
            month: now.month(),
            year: now.year()
        });
        const newMonthlyBudget = await monthlyBudget.save();
        res.status(201).json({ ...newMonthlyBudget._doc });
    } catch (err) {
        res.status(500).json({ ...err });
    }

}

exports.getMonthlyBudget = async (req, res) => {
    const _authToken = jwt.decode(req.get('Authorization'));
    try {
        const monthlyBudget = await MonthlyBudget.findOne({ _userID: _authToken._id, month: moment().month(), year: moment().year() });
        res.status(200).json({ monthlyBudget });
    } catch (err) {
        res.status(500).json({ ...err });
    }
}

exports.getYearlyBudget = async (req, res) => {
    const _authToken = jwt.decode(req.get('Authorization'));
    try {
        const monthlyBudget = await MonthlyBudget.find({ _userID: _authToken._id, year: moment().getYear() });
        res.status(200).jsom({ monthlyBudget });
    } catch (err) {
        res.status(500).json({ ...err });
    }
}