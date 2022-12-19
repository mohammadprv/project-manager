const { body } = require('express-validator');

function createProjectValidation() {
    return [
        body("title").notEmpty().withMessage("عنوان پروژه نمیتواند خالی باشد"),
        body("text").notEmpty().isLength({ min: 20 }).withMessage("متن پروژه نمیتواند خالی باشد و حداقل 20 نویسه باشد"),
        body("image").custom((value, { req }) => {
            if(req.file || Object.keys(req.files) == 0) throw "لطفا عکسی را برای پروژه انتخاب کنید";
            return true;
        })
    ]
}

module.exports = {
    createProjectValidation
}