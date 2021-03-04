const mongoose = require('mongoose');

const { errorCodes, errorMessage } = require('../../constant');
const { UserModel } = require('../../dataBase/models');
const { userService: { usersService } } = require('../../service');
const { userValidator } = require('../../validator');

module.exports = {
    isUserValid: async (req, res, next) => {
        try {
            const { email } = req.body;
            const { error } = userValidator.createUserValidator.validate(req.body);
            const alreadyCreatedUser = await UserModel.findOne({ email });

            if (error) {
                throw new Error(error.details[0].message);
            }

            if (alreadyCreatedUser) {
                throw new Error(errorMessage.EMAIl_EXISTS);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    isIdValid: async (req, res, next) => {
        try {
            const { userId } = req.params;

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                throw new Error(errorMessage.NOT_VALID_ID);
            }

            const singleUser = await usersService.getUserById(userId);

            if (!singleUser) {
                throw new Error(errorMessage.NOT_FOUND);
            }

            next();
        } catch (e) {
            res.status(errorCodes.NOT_FOUND).json(e.message);
        }
    }
};
