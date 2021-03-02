const { errorCodes, userEnum } = require('../../constant');
const { passwordHasher } = require('../../helper');
const { userModel: { modelUser } } = require('../../dataBase');

module.exports = {
    authentication: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await modelUser.findOne({ email });

            await passwordHasher.compare(password, user.password);

            res.json(userEnum.USER_AUTH);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
