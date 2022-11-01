const { validationResult } = require("express-validator");
const { hashString } = require("../../modules/functions");
const { UserModel } = require('../../models/user');
class AuthController {

    async register(req, res, next) {
    
        const { username, password, email, mobile } = req.body;

        const hashedPassword = hashString(password);
        const user = await UserModel.create({
            username,
            email,
            mobile,
            password: hashedPassword
        })


        res.json(user);
    }

    login() {
        
    }

    resetPassword() {
        
    }

}

module.exports = {
    AuthController: new AuthController()
}