const { body } = require("express-validator");
const path = require('path');

function profileImageValidator() {

    return[
        body("image").custom((value, { req }) => {
            if(Object.keys(req.file).length == 0) throw "لطفا عکسی انتخاب کنید";
            const extName = path.extname(req.file.originalname);
            const exts = [".jpg", ".png", ".jpeg"];
            if(!exts.includes(extName)) throw "فرمت عکس انتخابی صحیح نمیباشد";
            const maxSize = 5 * 1024 * 1024;
            if(req.file.size > maxSize) throw "حجم عکس انتخابی باید کمتر از 5 مگابایت باشد";
            return true;
        })
    ]
}


module.exports = {
    profileImageValidator
}