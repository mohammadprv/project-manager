const { hashString, tokenGenerator } = require("../../modules/functions");
const { UserModel } = require('../../models/user');

const bcrypt = require('bcrypt');

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

    
    async login(req, res, next) {
        
        try {
            const { username, password } = req.body;
            const user = await UserModel.findOne({ username });
            if(!user) throw { status: 401, success: false, message: "نام کاربری یا رمزعبور اشتباه می‌باشد" };
            const compareResult = bcrypt.compareSync(password, user.password);
            if(!compareResult) throw { status: 401, success: false, message: "نام کاربری یا رمزعبور اشتباه می‌باشد" };
            
            const token = tokenGenerator({ username });
            user.token = token;
            await user.save();

            return res.status(200).json({
                status: 200,
                success: true,
                message: "شما با موفقیت احراز شدید",
                token
            })

        } catch (error) {
            next(error);
        }

    }

    resetPassword() {
        
    }

}

module.exports = {
    AuthController: new AuthController()
}