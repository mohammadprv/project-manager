const { UserController } = require('../http/controllers/user.controller');
const { checkLogin } = require('../http/middlewares/autoLogin');

const router = require('express').Router();


//? User Profile Route
router.get("/profile", checkLogin, UserController.getProfile);

//? Edit User Profile Route
router.post("/profile", checkLogin, UserController.editProfile);

module.exports = {
    userRoutes: router
}