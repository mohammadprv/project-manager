const { verifyToken } = require('../../modules/functions');
const { UserModel } = require('../../models/user');

const checkLogin = async (req, res, next) => {

    try {
        const authError = { status: 401, success: false, message: "لطفا وارد حساب کاربری خود شوید" };

        const authorization = req?.headers?.authorization;
        if(!authorization) throw authError;
        const token = authorization.split(" ")?.[1];
        if(!token) throw authError;
        
        const result = verifyToken(token);
        const { username } = result;
        const user = await UserModel.findOne({ username });
        if(!user) throw authError;
        
        req.user = user;
        return next();
    } catch (error) {
        next(error)   
    }

}


module.exports = {
    checkLogin
}