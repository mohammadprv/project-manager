const { UserController } = require('../http/controllers/user.controller');
const { checkLogin } = require('../http/middlewares/autoLogin');

const router = require('express').Router();


//? User Profile Route
router.get("/profile", checkLogin, UserController.getProfile);


module.exports = {
    userRoutes: router
}