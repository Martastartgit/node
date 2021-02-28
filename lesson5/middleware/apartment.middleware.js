const errorMessage = require('../error/error.message');
const statusCode = require('../constant/status.codes');

module.exports = {
    isApartmentValid: (req, res, next) => {
        try {
            const { rooms, floorApartment } = req.body;

            if (!rooms || !floorApartment) {
                throw new Error(errorMessage.GENERAL.EMPTY_FIELD);
            }

            if (rooms <= 0 || !Number.isInteger(rooms)) {
                throw new Error(errorMessage.APARTMENT.ROOMS_NOT_VALID);
            }

            if (floorApartment < 0 || !Number.isInteger(floorApartment)) {
                throw new Error(errorMessage.APARTMENT.FLOOR_NOT_VALID);
            }

            next();
        } catch (e) {
            res.status(statusCode.NOT_FOUND).json(e.message);
        }
    }
};
