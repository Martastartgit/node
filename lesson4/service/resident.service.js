const Resident = require('../dataBase/models/Resident');

module.exports = {
    getAllResidents: (filterObject) => Resident.find(filterObject),

    getResidentById: (residentId) => Resident.findById(residentId),

    createResident: (residentObject) => Resident.create(residentObject),

    updateResident: (residentId, residentObject) => Resident.findByIdAndUpdate(residentId, residentObject, { new: true }),

    deleteResident: (residentId) => Resident.findByIdAndDelete(residentId)
};
