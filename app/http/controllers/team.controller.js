const { TeamModel } = require("../../models/team");

class TeamController {

    async createTeam(req, res, next) {
        try {
            const { name, username, description } = req.body;
            const owner = req.user._id;
            const team = await TeamModel.create({ name, username, description, owner });
            if(!team) throw { status: 500, success: false, message: "ایجاد تیم با مشکل مواجه شد" };
            return res.status(201).json({
                status: 201,
                success: true,
                message: "تیم با موفقیت ایجاد شد"
            });            
        } catch (error) {
            next(error);
        }
    }

    async getListOfTeams(req, res, next) {
        try {
            const teams = await TeamModel.find({});
            if(teams.length == 0) return res.status(200).json({ status: 200, success: true, message: "هیچ تیمی وجود ندارد" });
            return res.status(200).json({
                status: 200,
                message: true,
                teams
            });            
        } catch (error) {
            next(error);
        }
    }

    async getTeamByID(req, res, next) {
        try {
            const teamID = req.params.id;
            const team = await TeamModel.findById(teamID);
            if(!team) throw "هیچ تیمی با این شناسه یافت نشد";            
            return res.status(200).json({
                status: 200,
                success: true,
                team
            });            
        } catch (error) {
            next(error);
        }
    }

    async getMyTeams(req, res, next) {
        try {
            const userID = req.user._id;
            const teams = await TeamModel.find({
                $or: [
                    { owner: userID },
                    { users: userID }
                ]
            });
            return res.status(200).json({
                status: 200,
                success: true,
                teams
            })
        } catch (error) {
            next(error);
        }
    }
    
    async removeTeamById(req, res, next) {
        try {
            const teamID = req.params.id;
            const team = await TeamModel.findById(teamID);
            if(!team) throw "هیچ تیمی با این شناسه یافت نشد";
            const result = await TeamModel.deleteOne({ _id: teamID });
            if(result.deletedCount == 0) throw { status: 500, success: false, message: "تیم مورد نظر حذف نشد" };
            return res.status(200).json({
                status: 200,
                success: true,
                message: "پروژه با موفقیت حذف شد"
            });            
        } catch (error) {
            next(error);
        }
    }

    inviteUserToTeam() {

    }


    updateTeam() {

    }

    removeUserFromTeam() {
        
    }

}

module.exports = {
    TeamController: new TeamController()       
}