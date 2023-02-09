const { UserModel } = require("../../models/user");

class UserController {

    getProfile(req, res, next) {
        try {
            const user = req.user;
            // user.profile_image = req.protocol + "://" + req.get("host") + "/" + user.profile_image.replace(/[\\\\]/gm, "/");
            res.status(200).json({
                status: 200,
                success: true,
                user
            });

        } catch (error) {
            next(error);
        }
    }

    async editProfile(req, res, next) {
        try {
            let data = req.body;
            const userID = req.user._id;
            const fields = ["first_name", "last_name", "skills"];
            const badValues = ["", " ", null, undefined, NaN, {}, [], 0, -1]; 
            Object.entries(data).forEach(([key, value]) => {
                if(!fields.includes(key)) delete data[key];
                if(badValues.includes(value)) delete data[key];
            });
            const result = await UserModel.updateOne({ _id: userID }, { $set: data });
            if(result.modifiedCount > 0) {
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "به‌روزرسانی حساب کاربری شما با موفقیت انجام شد"
                });
            }
            throw { status: 500, success: false, message: "به‌روزرسانی حساب کاربری انجام نشد" }
        } catch (error) {
            next(error)
        }
    }

    async uploadProfileImage(req, res, next) {
        try {
            const userID = req.user._id;
            const filePath = req.protocol + "://" + req.get("host") + "/" + req.file?.path?.substring(7).replace(/[\\\\]/gm, "/");
            const result = await UserModel.updateOne({ _id: userID }, { $set: { profile_image: filePath } });
            if(result.modifiedCount == 0) throw { status: 400, success: false, message: "به روزرسانی انجام نشد" };
            return res.status(200).json({
                status: 200,
                success: true,
                message: "به روزرسانی حساب کاربری با موفقیت انجام شد"
            });
        } catch (error) {
            next(error);
        }
    }

    async getAllUsersInvitations(req, res, next) {
        try {
            const userID = req.user._id;
            const invitations = await UserModel.findById(userID, { invitations: 1 });
            return res.status(200).json({
                invitations
            })
        } catch (error) {
            next(error);
        }
    }

    addSkills() {

    }

    editSkills() {

    }

    acceptInviteInTeam() {

    }

    rejectInviteInTeam() {

    }

}


module.exports = {
    UserController: new UserController()
}