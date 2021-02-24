const router = require('express').Router();

const userController = require('../controller/user.controller');
const userMiddleware = require('../middleware/user.middleware');


router.route('/')
    .get(userController.getUsers)
    .post(userMiddleware.isUserValid, userController.createUser);
router.route('/:userId')
    .get(userMiddleware.isIdValid, userController.getUserById)
    .delete(userMiddleware.isIdValid, userController.deleteUser);


module.exports = router;
