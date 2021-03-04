const { O_AUTH: { O_AUTH_Model } } = require('../../dataBase');
const { tokenizer } = require('../../helper');

module.exports = {
    createToken: (tokenObject) => O_AUTH_Model.create(tokenObject),

    createNewToken: async (refreshToken) => {
        await O_AUTH_Model.findByIdAndDelete(refreshToken._id);

        const newTokens = tokenizer();

        await O_AUTH_Model.create({ ...newTokens, _user_id: refreshToken._user_id });

        return newTokens;
    },

    deleteToken: (userId) => O_AUTH_Model.remove({ _user_id: userId })
};
