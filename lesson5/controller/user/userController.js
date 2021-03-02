const { errorCodes, userEnum } = require('../../constant');
const { passwordHasher } = require('../../helper');
const { userService: { usersService } } = require('../../service');

module.exports = {
    findAllUsers: async (req, res) => {
        try {
            const users = await usersService.getAllUsers();

            res.json(users);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    findUserById: async (req, res) => {
        try {
            const { userId } = req.params;

            const oneUser = await usersService.getUserById(userId);

            res.json(oneUser);
        } catch (e) {
            res.status(errorCodes.NOT_FOUND).json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const { password } = req.body;

            const hashPassword = await passwordHasher.hash(password);

            await usersService.createUser({ ...req.body, password: hashPassword });

            res.json(userEnum.USER_CREATED);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    deleteUserById: async (req, res) => {
        try {
            const { userId } = req.params;

            await usersService.deleteUserById(userId);

            res.json(userEnum.USER_DELETED);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
