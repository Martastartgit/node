const { errorCodes } = require('../../constant');
const { passwordHasher, tokenizer } = require('../../helper');
const { User } = require('../../dataBase');
const { authService: { O_AUTH_SERVICE } } = require('../../service');

module.exports = {
    authentication: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.UserModel.findOne({ email });

            await passwordHasher.compare(password, user.password);

            const tokens = tokenizer();

            await O_AUTH_SERVICE.createToken({ ...tokens, _user_id: user._id });

            res.json(tokens);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    createNewTokens: async (req, res) => {
        try {
            const { refreshToken } = req;

            const tokens = await O_AUTH_SERVICE.createNewToken(refreshToken);

            res.json(tokens);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
