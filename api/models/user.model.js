'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    hash_password: {
        type: String,
        required: true
    }
});

userSchema.methods.comparePassword = function(_password) {
    return bcrypt.compareSync(_password, this.hash_password);
}

module.exports = mongoose.model('User', userSchema);