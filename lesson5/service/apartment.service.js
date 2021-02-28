const errorMessage = require('../error/error.message');
const Apartment = require('../dataBase/models/Apartment');
require('../dataBase/models/Resident');

module.exports = {
    getAllApartments: (filterObject) => Apartment.find(filterObject),

    getSingleApartment: async (apartmentId) => {
        const oneApartment = await Apartment.findById(apartmentId);

        if (!oneApartment) throw new Error(errorMessage.GENERAL.NOT_FOUND);

        return oneApartment;
    },

    createApartment: (apartmentObject) => Apartment.create(apartmentObject),

    updateApartment: async (apartmentId, apartmentObject) => {
        const updateApartment = await Apartment.findByIdAndUpdate(apartmentId, apartmentObject, { new: true });

        if (!updateApartment) throw new Error(errorMessage.GENERAL.NOT_FOUND);

        return updateApartment;
    },

    deleteApartment: async (apartmentId) => {
        const deleteApartment = await Apartment.findByIdAndDelete(apartmentId);

        if (!deleteApartment) throw new Error(errorMessage.GENERAL.NOT_FOUND);

        return deleteApartment;
    }
};
