'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../config');
const User = require('../models/user.model');
const ExpiredToken = require('../models/expired-tokens');

exports.register = async (req, res) => {
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            hash_password: hashPassword
        });
        const _user = await newUser.save();
        res.status(201).json({ token: jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60), _id:_user._id }, config.secret), user: { name: _user.username}});
    } catch(err) {
        // Log err
        res.status(500).json({ ...err });
    }
}

exports.login = async function(req, res) {
    try {
        const _user = await User.findOne({ email: req.body.email });
        if (_user.comparePassword(req.body.password)) {
            res.status(200).json({ token: jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60), _id: _user._id }, config.secret), user: { name: _user.username }});
        } else {
            res.status(401).json({ error: 'Unable to authenticate user'});
        }
    } catch (err) {
        // log err
        res.status(401).json({error: 'Unable to find user'});
    }
}

exports.logout = async (req, res) => {
    const _authToken = req.get('Authorization');
    try {
        const expiredToken = new ExpiredToken({ token: _authToken });
        const _token = await expiredToken.save();
        res.status(201).json({ loggedOut: true });
    } catch (err) {
        res.status(500).json({ ...err });
    }
}