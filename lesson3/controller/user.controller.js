const userService = require('../service/user.service');
const userConstants = require('../constant/user.constant');
const statusCode = require('../constant/status.codes');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const value = Object.values(req.query);

            const key = Object.keys(req.query);

            if (value.toString()) {
                const users = await userService.getUserByQuery(key.toString(), value.toString());

                res.json(users);
                return;
            }

            const users = await userService.getAllUsers();

            res.json(users);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            await userService.createUser(req.body);

            res.status(statusCode.CREATED).json(userConstants.USER_CREATED);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    getUserById: async (req, res) => {
        try {
            const users = await userService.getUserById(req.params.userId);

            res.json(users);
        } catch (e) {
            res.status(statusCode.NOT_FOUND).json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            await userService.deleteUser(req.params.userId);

            res.json(userConstants.USER_DELETED);
        } catch (e) {
            res.status(statusCode.NOT_FOUND).json(e.message);
        }
    },
};
