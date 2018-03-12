'use strict';

const express = require('express');

module.exports = _ => {
    const BudgetController = require('../controllers/budget-controller');
    const budgetRouter = express.Router();

    budgetRouter.route('/line-item')
        .post(BudgetController.addLineItem);

    budgetRouter.route('/monthly-total')
        .get(BudgetController.monthlySpentTotal);

    budgetRouter.route('/set-monthly-budget')
        .post(BudgetController.setMonthlyBudget)
        .put(BudgetController.updateMonthlyBudget);

    budgetRouter.route('/get-monthly-budget')
        .get(BudgetController.getMonthlyBudget);

    budgetRouter.route('/get-yearly-budget')
        .get(BudgetController.getYearlyBudget);

    budgetRouter.route('/get-yearly-totals')
        .get(BudgetController.getYearlyTotals);

    return budgetRouter;
}