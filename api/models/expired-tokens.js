'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expiredSchema = new Schema({
    token: {
        type: String,
        required: true,
        index: true
    }
}, { autoIndex: false });

module.exports = mongoose.model('ExpiredToken', expiredSchema);
