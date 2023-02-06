const { body } = require('express-validator');
const { TeamModel } = require('../../models/team');


function createTeamValidator() {
    return [
        body("name").isLength({ min: 5 }).withMessage("نام تیم باید بیشتر از 5 نویسه باشد"),
        body("description").notEmpty().withMessage("توضیحات نمیتواند نمیتواند خالی باشد"),
        body("username").custom( async (username) => {
            const usernameRegex =  /^[a-z]+[a-z0-9\.\_]{3,}/gim;
            if(usernameRegex.test(username)) {
                const team = await TeamModel.findOne({ username });
                if(team) throw "این نام کاربری قبلا توسط یک تیم دیگر انتخاب شده است";
                return true;
            }
            throw "نام کاربری را به درستی وارد کنید"
        })
    ]
}


module.exports = {
    createTeamValidator
}