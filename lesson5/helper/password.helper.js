const bcrypt = require('bcrypt');

const { errorMessage } = require('../constant');

module.exports = {
    hash: (password) => bcrypt.hash(password, 12),

    compare: async (password, hashPassword) => {
        const isPasswordEqual = await bcrypt.compare(password, hashPassword);

        if (!isPasswordEqual) {
            throw new Error(errorMessage.FAILED_AUTH);
        }
    }
};
