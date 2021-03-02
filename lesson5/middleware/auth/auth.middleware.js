const { errorMessage, errorCodes } = require('../../constant');
const { userModel: { modelUser } } = require('../../dataBase');

module.exports = {
    isUserCreated: async (req, res, next) => {
        try {
            const { email } = req.body;
            const user = await modelUser.findOne({ email });

            if (!user) {
                throw new Error(errorMessage.NOT_FOUND);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
