const bcrypt = require('bcrypt');
const { Result } = require('express-validator');
const jwt = require('jsonwebtoken');


function hashString(str) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, salt);
}


function tokenGenerator(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "10 days" });
    return token;
}

function verifyToken(token) {
    const result = jwt.verify(token, process.env.SECRET_KEY);
    if(!result?.username) throw { status: 401, success: false, message: "لطفا وارد حساب کاربری خود شوید" };
    return result;
}

module.exports = {
    hashString,
    tokenGenerator,
    verifyToken
}