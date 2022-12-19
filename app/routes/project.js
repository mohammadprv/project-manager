const { ProjectController } = require('../http/controllers/project.controller');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { expressValidatorMapper } = require('../http/middlewares/checkError');
const { createProjectValidation } = require('../http/validation/project');
const fileUpload = require('express-fileupload');
const { uploadFile } = require('../modules/express-fileupload');

const router = require('express').Router();


//? Create Project
router.post("/create", fileUpload(), checkLogin, uploadFile, createProjectValidation(), expressValidatorMapper, ProjectController.createProject)

module.exports = {
    projectRoutes: router
}