const apartmentService = require('../service/apartment.service');
const apartmentConstant = require('../constant/apartment.constant');
const statusCode = require('../constant/status.codes');

module.exports = {
    findAllApartment: async (req, res) => {
        try {
            const apartments = await apartmentService.getAllApartments(req.query);

            res.json(apartments);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    createApartment: async (req, res) => {
        try {
            await apartmentService.createApartment(req.body);

            res.status(statusCode.CREATED).json(apartmentConstant.APARTMENT_CREATED);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    findSingleApartment: async (req, res) => {
        try {
            const { apartmentId } = req.params;

            const singleApartment = await apartmentService.getSingleApartment(apartmentId);

            res.json(singleApartment);
        } catch (e) {
            res.status(statusCode.NOT_FOUND).json(e.message);
        }
    },

    deleteApartmentById: async (req, res) => {
        try {
            const { apartmentId } = req.params;

            await apartmentService.deleteApartment(apartmentId);

            res.json(apartmentConstant.APARTMENT_DELETED);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    updateApartmentById: async (req, res) => {
        try {
            const { apartmentId } = req.params;

            await apartmentService.updateApartment(apartmentId, req.body);

            res.json(apartmentConstant.APARTMENT_UPDATED);
        } catch (e) {
            res.status(statusCode.NOT_FOUND).json(e.message);
        }
    }
};
