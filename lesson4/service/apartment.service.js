const Apartment = require('../dataBase/models/Apartment');
require('../dataBase/models/Resident');

module.exports = {
    getAllApartments: (filterObject) => Apartment.find(filterObject),

    getSingleApartment: (apartmentId) => Apartment.findById(apartmentId),

    createApartment: (apartmentObject) => Apartment.create(apartmentObject),

    updateApartment: (apartmentId, apartmentObject) => Apartment.findByIdAndUpdate(apartmentId, apartmentObject, { new: true }),

    deleteApartment: (apartmentId) => Apartment.findByIdAndDelete(apartmentId)
};
