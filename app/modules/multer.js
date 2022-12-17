const multer = require('multer');

const path = require('path');
const { createUploadPath } = require('./functions');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, createUploadPath());
    },
    filename: (req, file, cb) => {
        const fileExtName = path.extname(file?.originalname || "");
        cb(null, Date.now() + fileExtName);
    }
})

const upload_multer = multer({ storage });

module.exports = {
    upload_multer
}