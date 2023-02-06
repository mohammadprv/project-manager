const { TeamModel } = require("../../models/team");

class TeamController {

    async createTeam(req, res, next) {
        const { name, username, description } = req.body;
        const owner = req.user._id;
        const team = await TeamModel.create({ name, username, description, owner });
        if(!team) throw { status: 500, success: false, message: "ایجاد تیم با مشکل مواجه شد" };
        return res.status(201).json({
            status: 201,
            success: true,
            message: "تیم با موفقیت ایجاد شد"
        });
    }

    inviteUserToTeam() {

    }

    removeTeamById() {

    }

    updateTeam() {

    }

    removeUserFromTeam() {
        
    }

}

module.exports = {
    TeamController: new TeamController()       
}