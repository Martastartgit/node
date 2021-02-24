const userService = require('../service/user.service');
const userConstants = require('../constant/user.constant');
const statusCode = require('../constant/status.codes');

module.exports = {
    getUsers: (req, res) => {
        try {
            const value = Object.values(req.query);

            const key = Object.keys(req.query);

            if (value.toString()) {
                userService.getUserByQuery(key.toString(), value.toString()).then(user => res.json(user));

                return;
            }

            userService.getAllUsers().then(users => res.json(users));
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    createUser: (req, res) => {
        userService.createUser(req.body);

        res.status(statusCode.CREATED).json(userConstants.USER_CREATED);

    },

    getUserById: (req, res) => {
       userService.getUserById(req.params.userId).then(user => res.json(user));

    },

    deleteUser: (req, res) => {
        userService.deleteUser(req.params.userId);

        res.json(userConstants.USER_DELETED);
    }

}
