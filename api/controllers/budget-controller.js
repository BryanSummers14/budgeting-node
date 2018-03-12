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

exports.updateMonthlyBudget = async (req, res) => {
    const _authToken = jwt.decode(req.get('Authorization'));
    const now = moment();
    const { recurring, necessary, recreational, budgetId } = { ...req.body };
    try {
        const updatedBudget = await MonthlyBudget.findByIdAndUpdate(budgetId, { $set: { recurring, necessary, recreational }}, { new: true });
        res.status(201).json({ monthlyBudget: updatedBudget._doc });
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
        res.status(200).json({ monthlyBudget });
    } catch (err) {
        res.status(500).json({ ...err });
    }
}

exports.getYearlyTotals = async (req, res) => {
    const now = moment();
    const _authToken = jwt.decode(req.get('Authorization'));
    try {
        const monthlyBudgets = await MonthlyBudget.find({ _userID: _authToken._id, year: now.year() });
        const yearlyBudgetTotals = monthlyBudgets.map(_budget => {
            return ((+_budget.recurring) + (+_budget.necessary) + (+_budget.recreational));
        });

        const yearlyExpenses = await Expense.find({ _userID: _authToken._id, date: { $gt: now.startOf('year').toISOString(), $lt: now.endOf('year').toISOString() } });
        let trackedMonths = new Set();
        const yearlyExpenseGrouped = yearlyExpenses.reduce((_prev, _expense) => {
            trackedMonths.add(moment(_expense.date).month());
            if (_prev.length === 0) {
                _prev.push([_expense]);
                return _prev;
            } else {
                if (moment(_prev[_prev.length - 1][0].date).month() == moment(_expense.date).month()) {
                    _prev[_prev.length - 1].push(_expense);
                    return _prev;
                } else {
                    _prev.push([_expense]);
                    return _prev;
                }
            }
        }, []);
        const yearlyExpenseTotals = yearlyExpenseGrouped.map(_group => {
            return _group.reduce((_prev, _expense) => _prev + _expense.amount, 0);
        })
        res.status(200).json({ budget: yearlyBudgetTotals, expenses: yearlyExpenseTotals, months: [...trackedMonths] });
    } catch (err) {
        res.status(500).json({ ...err });
    }
}