const { Schema, model } = require('mongoose');
require('./Resident');

const ApartmentSchema = new Schema({
    rooms: { type: Number, required: true },
    floorApartment: { type: Number, default: 0 },
    communication: { type: Boolean },
    _residents: [{ type: Schema.Types.ObjectId }]

}, { toObject: { virtuals: true }, toJSON: { virtuals: true }, strictQuery: 'throw' });

ApartmentSchema.virtual('fullInfo').get(function() {
    return `${this.floorApartment} ${this.rooms}`;
});

ApartmentSchema.virtual('apartmentResidents', {
    ref: 'Resident',
    localField: '_residents',
    foreignField: '_id',
    options: {
        sort: 'age'
    }
});

ApartmentSchema
    .pre('find', function() {
        this.populate('apartmentResidents');
    })
    .pre('findOne', function() {
        this.populate('apartmentResidents');
    });

module.exports = model('Apartment', ApartmentSchema);
