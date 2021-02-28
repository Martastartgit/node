const errorMessage = require('../error/error.message');
const statusCode = require('../constant/status.codes');

module.exports = {
    isIdValid: (req, res, next) => {
        try {
           const id = Object.values(req.params).toString();

            if (!id) {
                throw new Error(errorMessage.GENERAL.NOT_FOUND_ID);
            }

            if (id.length < 24) {
                throw new Error(errorMessage.GENERAL.NOT_VALID_ID);
            }

            next();
        } catch (e) {
            res.status(statusCode.NOT_FOUND).json(e.message);
        }
    },

    isResidentValid: (req, res, next) => {
        try {
            const { name, age, gender } = req.body;

            if (!name || !age || !gender) {
                throw new Error(errorMessage.GENERAL.EMPTY_FIELD);
            }

            if (name.length < 3) {
                throw new Error(errorMessage.RESIDENT.NAME_TOO_SHORT);
            }

            if (age < 0 || !Number.isInteger(age)) {
                throw new Error(errorMessage.RESIDENT.AGE_IS_NOT_VALID);
            }

            if (gender !== 'female' && gender !== 'male') {
                throw new Error(errorMessage.RESIDENT.GENDER_NOT_EXISTS);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    }
};
