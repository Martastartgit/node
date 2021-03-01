const { Schema, model } = require('mongoose');

const residentSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true }, strictQuery: 'throw' });

residentSchema.virtual('fullResident').get(function() {
    return `${this.name} ${this.gender} ${this.age}`;
});

module.exports = model('Resident', residentSchema);
