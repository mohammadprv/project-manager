const { ProjectController } = require('../http/controllers/project.controller');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { expressValidatorMapper } = require('../http/middlewares/checkError');
const { createProjectValidation } = require('../http/validation/project');
const { mongoIDValidator } = require('../http/validation/public');
const fileUpload = require('express-fileupload');
const { uploadFile } = require('../modules/express-fileupload');

const router = require('express').Router();


//? Create Project
router.post("/create", fileUpload(), checkLogin, uploadFile, createProjectValidation(), expressValidatorMapper, ProjectController.createProject);

//? Get All Projects
router.get("/get-all-projects", checkLogin, expressValidatorMapper, ProjectController.getAllProject);

//? Get Project by ID
router.get("/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, ProjectController.getProjectById);

//? Delete Project by ID
router.delete("/remove/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, ProjectController.removeProject);

//? Get Project by ID
router.put("/edit/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, ProjectController.UpdateProject);

module.exports = {
    projectRoutes: router
}