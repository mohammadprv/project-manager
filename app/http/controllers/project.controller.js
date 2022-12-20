const { ProjectModel } = require("../../models/project");

class ProjectController {
    
    async createProject(req, res, next) {
        try {
            const { title, text, image, tags } = req.body;
            const owner = req.user._id;
            const result = await ProjectModel.create({ title, text, owner, image, tags });
            if(!result) throw { status: 400, success: false, message: "افزودن پروژه با مشکل روبه‌رو شد" };
            return res.status(201).json({
                status: 201,
                success: true,
                message: "پروژه با موفقیت اضافه شد"
            });
        } catch (error) {
            next(error);
        }
    }

    async getAllProject(req, res, next) {
        try {
            const owner = req.user._id;
            const projects = await ProjectModel.find({ owner });
            if(projects.length < 1) throw { status: 200, success: true, message: "هیچ پروژه‌ای وجود ندارد" };
            return res.status(200).json({
                status: 200,
                success: true,
                projects
            });
        } catch (error) {
            next(error);
        }
    }

    getProjectById() {

    }

    getAllProjectOfTeam() {

    }

    getProjectOfUser() {

    }

    UpdateProject() {

    }

    removeProject() {

    }

}

module.exports = {
    ProjectController: new ProjectController()
}