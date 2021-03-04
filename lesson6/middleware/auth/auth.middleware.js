const jwt = require('jsonwebtoken');

const { constants, errorMessage, errorCodes } = require('../../constant');
const { O_AUTH_Model, UserModel } = require('../../dataBase/models');
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require('../../config/config');

module.exports = {
    isUserCreated: async (req, res, next) => {
        try {
            const { email } = req.body;
            const user = await UserModel.findOne({ email });

            if (!user) {
                throw new Error(errorMessage.NOT_FOUND);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const access_token = await req.get(constants.AUTHORIZATION);

            if (!access_token) {
                throw new Error(errorMessage.TOKEN_REQUIRED);
            }

            jwt.verify(access_token, JWT_ACCESS_SECRET, (err) => {
                if (err) throw new Error(errorMessage.NOT_VALID_TOKEN);
            });

            const tokens = await O_AUTH_Model.findOne({ access_token }).populate('_user_id');

            if (!tokens) {
                throw new Error(errorMessage.NOT_VALID_TOKEN);
            }

            if (userId !== tokens._user_id._id.toString()) {
                throw new Error(errorMessage.UNAUTHORIZED);
            }

            req.user = tokens._user_id;

            next();
        } catch (e) {
            res.status(errorCodes.UNAUTHORIZED).json(e.message);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = await req.get(constants.AUTHORIZATION);

            if (!refresh_token) {
                throw new Error(errorMessage.TOKEN_REQUIRED);
            }

            jwt.verify(refresh_token, JWT_REFRESH_SECRET, (err) => {
                if (err) throw new Error(errorMessage.NOT_VALID_TOKEN);
            });

            const tokens = await O_AUTH_Model.findOne({ refresh_token });

            if (!tokens) {
                throw new Error(errorMessage.NOT_VALID_TOKEN);
            }

            req.refreshToken = tokens;

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

};
