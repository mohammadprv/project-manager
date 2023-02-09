const mongoose = require('mongoose');

const inviteRequest = new mongoose.Schema({
    teamID: { type: mongoose.Types.ObjectId, required: true },
    caller: { type: String, required: true, lowercase: true },
    requestStatus: { type: String, default: "pending" },
    requestDate: { type: Date, default: new Date() }
})


const UserSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name : { type: String },
    username  : { type: String, required: true, unique: true },
    mobile    : { type: String, required: true, unique: true },
    roles     : { type: [String], default: ["USER"] },
    email     : { type: String, required: true, unique: true },
    password  : { type: String, required: true },
    skills    : { type: [String], default: [] },
    teams     : { type: [mongoose.Types.ObjectId], default: [] },
    token     : { type: String, default: "" },
    profile_image: { type: String, default: "" },
    invitations: { type: [inviteRequest] }
}, {
    timestamps: true
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = {
    UserModel
}