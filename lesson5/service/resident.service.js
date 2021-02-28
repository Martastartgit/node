const Resident = require('../dataBase/models/Resident');
const errorMessage = require('../error/error.message');

module.exports = {
    getAllResidents: (filterObject) => Resident.find(filterObject),

    getResidentById: async (residentId) => {
        const singleResident = await Resident.findById(residentId);

        if (!singleResident) throw new Error(errorMessage.GENERAL.NOT_FOUND);

        return singleResident;
    },

    createResident: (residentObject) => Resident.create(residentObject),

    updateResident: async (residentId, residentObject) => {
        const updateResident = await Resident.findByIdAndUpdate(residentId, residentObject, { new: true });

        if (!updateResident) throw new Error(errorMessage.GENERAL.NOT_FOUND);

        return updateResident;
    },

    deleteResident: async (residentId) => {
        const deleteResident = await Resident.findByIdAndDelete(residentId);

        if (!deleteResident) throw new Error(errorMessage.GENERAL.NOT_FOUND);

        return deleteResident;
    }
};
