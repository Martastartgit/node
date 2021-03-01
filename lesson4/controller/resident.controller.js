const residentService = require('../service/resident.service');
const statusCode = require('../constant/status.codes');
const residentConstant = require('../constant/resident.constant');

module.exports = {
    findAllResident: async (req, res) => {
        try {
            const residents = await residentService.getAllResidents(req.query);

            res.json(residents);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    createResident: async (req, res) => {
        try {
            await residentService.createResident(req.body);

            res.status(statusCode.CREATED).json(residentConstant.RESIDENT_CREATED);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    getSingleResident: async (req, res) => {
        try {
            const { residentId } = req.params;

            const singleResident = await residentService.getResidentById(residentId);

            res.json(singleResident);
        } catch (e) {
            res.status(statusCode.NOT_FOUND).json(e.message);
        }
    },

    deleteResidentById: async (req, res) => {
        try {
            const { residentId } = req.params;

            await residentService.deleteResident(residentId);

            res.json(residentConstant.RESIDENT_DELETED);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    updateResidentById: async (req, res) => {
        try {
            const { residentId } = req.params;

            await residentService.updateResident(residentId, req.body);

            res.json(residentConstant.RESIDENT_UPDATED);
        } catch (e) {
            res.status(statusCode.NOT_FOUND).json(e.message);
        }
    }
};
