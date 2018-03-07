'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expiredSchema = new Schema({
    token: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('ExpiredToken', expiredSchema);
