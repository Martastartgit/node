const { Schema, model } = require('mongoose');

const { dataBaseTables: { USER } } = require('../../constant');

const userScheme = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, min: 10 }
});

module.exports = model(USER, userScheme);
