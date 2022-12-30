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

    async getProjectById(req, res, next) {
        try {
            const owner = req.user._id;
            const projectID = req.params.id;
            const project = await ProjectModel.findOne({ owner, _id: projectID });
            if(!project) throw { status: 404, success: false, message: "پروژه یافت نشد" };
            return res.status(200).json({
                status: 200,
                success: true,
                project
            });
        } catch (error) {
            next(error);
        }
    }

    async removeProject(req, res, next) {
        try {
            const owner = req.user._id;
            const projectID = req.params.id;
            const project = await ProjectModel.findOne({ owner, _id: projectID });
            if(!project) throw { status: 404, success: false, message: "پروژه یافت نشد" };
            const deleteProjectResult = await ProjectModel.deleteOne({ _id: projectID });
            if(deleteProjectResult.deletedCount == 0) throw { status: 400, success: false, message: "پروژه حذف نشد" };
            return res.status(200).json({
                status: 200,
                success: true,
                message: "پروژه مورد نظر با موفقیت  حذف شد"
            })
        } catch (error) {
            next(error);
        }
    }
    
    async UpdateProject(req, res, next) {
        try {
            const owner = req.user._id;
            const projectID = req.params.id;
            const project = await ProjectModel.findOne({ owner, _id: projectID });
            if(!project) throw { status: 404, success: false, message: "پروژه یافت نشد" };
            let data = { ...req.body };
            const fields = ["title", "text", "tags"];
            const badValues = ["", " ", 0, -1, NaN, undefined, [], {}];
            Object.entries(data).forEach(([key, value]) => {
                if(!fields.includes(key)) delete data[key];
                if(badValues.includes(value)) delete data[key];
            });
            const updateResult = await ProjectModel.updateOne({ _id: projectID }, { $set: data });
            if(updateResult.modifiedCount == 0) throw { status: 500, success: false, message: "به روزرسانی پروژه انجام نشد" };
            return res.status(200).json({
                status: 200,
                success: true,
                message: "به روزرسانی پروژه با موفقیت انجام شد"
            });
        } catch (error) {
            next(error)
        }
    }
    
    getAllProjectOfTeam() {

    }

    getProjectOfUser() {

    }


}

module.exports = {
    ProjectController: new ProjectController()
}