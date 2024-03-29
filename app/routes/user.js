const { UserController } = require('../http/controllers/user.controller');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { expressValidatorMapper } = require('../http/middlewares/checkError');
const { profileImageValidator } = require('../http/validation/usre');
const { upload_multer } = require('../modules/multer');

const router = require('express').Router();


//? User Profile Route
router.get("/profile", checkLogin, expressValidatorMapper, UserController.getProfile);

//? Edit User Profile Route
router.post("/profile", checkLogin, expressValidatorMapper, UserController.editProfile);

//? Upload Profile Image
router.post("/profile-image", upload_multer.single("image"),  profileImageValidator(), checkLogin, expressValidatorMapper, UserController.uploadProfileImage);

//? Get All Invitations
router.get("/invitations", checkLogin, UserController.getAllUsersInvitations);

//? Get Invitations By Status
router.get("/invitations/:status", checkLogin, UserController.getUserInvitationByStatus);


module.exports = {
    userRoutes: router
}