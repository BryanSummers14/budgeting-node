'use strict';

const express = require('express');

module.exports = _ => {
    const _authController = require('../controllers/auth-controller');
    const authRouter = express.Router();
    authRouter.route('/register')
        .post(_authController.register);

    authRouter.route('/login')
        .post(_authController.login);

    authRouter.route('/logout')
        .post(_authController.logout)

    return authRouter;
}