const fileUpload = require('express-fileupload');
const path = require('path');

const { createUploadPath } = require('../modules/functions');

const uploadFile = async (req, res, next) => {
    try {
        const image = req.files.image;
        const imagePath = path.join(createUploadPath(), Date.now() + path.extname(image.name));
        req.body.image = imagePath;
        const filePath = path.join(__dirname, "..", "..", imagePath);
        image.mv(filePath, (err) => {
            if(err) throw { status: 500, success: false, message: "بارگذاری تصویر انجام نشد" };
            next();
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    uploadFile
}