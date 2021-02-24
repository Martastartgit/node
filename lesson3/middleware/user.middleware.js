const errorMessages = require('../error/error.message');
const statusCodes = require('../constant/status.codes');

module.exports = {
    isUserValid: (req, res, next) => {
        try {
            const { name, password, gender, preferL = 'en' } = req.body;

            if (!name || !password || !gender) {
                throw new Error(errorMessages.EMPTY_FIELD[preferL]);
            }

            if (password.length < 4) {
                throw new Error(errorMessages.TOO_WEAK_PASSWORD[preferL]);
            }

            next();
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    },

    isIdValid: (req, res, next) => {
        try {
            const userId = +req.params.userId;

            if (userId < 0 || Number.isNaN(userId) || !Number.isInteger(userId)) {
                throw new Error(errorMessages.VALID_ID);
            }

            next();
        } catch (e) {
            res.status(statusCodes.BAD_REQUEST).json(e.message);
        }
    }
}
