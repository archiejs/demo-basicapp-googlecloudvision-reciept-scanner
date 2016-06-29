'use strict';

var mongoose = require('mongoose');

var recieptSchema = new mongoose.Schema({
    docId: { type: String, unique: true },

    number: String, // invoice number
    amount: String,
    desc: String, // description

    updatedOn: { type: Date, default: Date.now },
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reciept', recieptSchema);
