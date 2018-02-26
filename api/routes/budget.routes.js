'use strict';

const express = require('express');

module.exports = _ => {
    const BudgetController = require('../controllers/budget-controller');
    const budgetRouter = express.Router();

    budgetRouter.route('/line-item')
        .get(BudgetController.getAllLineItems)
        .post(BudgetController.addLineItem);

    return budgetRouter;
}