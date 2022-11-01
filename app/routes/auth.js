const { AuthController } = require('../http/controllers/auth.controller');
const { expressValidatorMapper } = require('../http/middlewares/checkError');
const { registerValidator } = require('../http/validation/auth');

const router = require('express').Router();

router.post("/register", registerValidator(), expressValidatorMapper, AuthController.register);

module.exports = {
    authRoutes: router
}