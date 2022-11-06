const { UserModel } = require("../../models/user");

class UserController {

    getProfile(req, res, next) {
        try {
            const user = req.user;
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
            const badValues = ["", " ", undefined, NaN, null, 0, -1, [], {}];

            Object.entries(data).forEach(([key, value]) => {
                if(!fields.includes(key)) delete data[key];
                if(badValues.includes(value)) delete data[key];
            })

            const result = await UserModel.updateOne({ _id: userID }, { $set: data });
            if(result.modifiedCount > 0) {
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "به‌روزرسانی پروفایل شما با موفقیت انجام شد"
                });
            }
            throw { status: 400, success: false, message: "به‌روزرسانی پروفایل انجام نشد" };

        } catch (error) {
            next(error)
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