const router = require('express').Router();

const { userController: { user_controller } } = require('../controller');
const { userMiddleware: { users_middleware } } = require('../middleware');

router.route('/')
    .get(user_controller.findAllUsers)
    .post(users_middleware.isUserValid, user_controller.createUser);
router.route('/:userId')
    .get(users_middleware.isIdValid, user_controller.findUserById)
    .delete(users_middleware.isIdValid, user_controller.deleteUserById);

module.exports = router;
