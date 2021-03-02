const router = require('express').Router();

const { authMiddleware: { auth_middleware } } = require('../middleware');
const { authController: { userAuth } } = require('../controller');

router.post('/', auth_middleware.isUserCreated, userAuth.authentication);

module.exports = router;
