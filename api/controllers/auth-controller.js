'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../config');
const User = require('../models/user.model');

exports.register = async (req, res) => {
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({...req.body});
    newUser.hash_password = hashPassword;
    try {
        let _user = await newUser.save();
        res.status(201).json({ token: jwt.sign({_id:_user._id }, config.secret), user: { name: _user.username}});
    } catch(err) {
        // Log err
        res.status(500).json({error: err });
    }
}

exports.login = async function(req, res) {
    const { _email } = { ...req.body };
    try {
        const _user = await User.findOne({ email: _email });
        if (_user.comparePassword(req.body.password)) {
            res.status(200).json({ token: jwt.sign({ _id: _user._id }, config.secret), user: { name: _user.username }});
        } else {
            res.status(401).json({ error: 'Unable to authenticate user'});
        }
    } catch (err) {
        // log err
        res.status(401).json({error: 'Unable to find user'});
    }
}