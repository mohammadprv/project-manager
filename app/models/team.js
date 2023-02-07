const mongoose = require('mongoose');

const inviteRequest = new mongoose.Schema({
    teamID: { type: mongoose.Types.ObjectId, required: true },
    caller: { type: String, required: true, lowercase: true },
    requestStatus: { type: String, default: "pending" },
    requestDate: { type: Date, default: new Date() }
})

const TeamSchema = new mongoose.Schema({

    name       : { type: String, required: true },
    username: { type: String, required: true, unique: true },
    description: { type: String },
    users      : { type: [mongoose.Types.ObjectId], default: [] },
    owner      : { type: mongoose.Types.ObjectId, required: true },
    invitations: { type: [inviteRequest] }

}, {
    timestamps: true
})

const TeamModel = mongoose.model("team", TeamSchema);

module.exports = {
    TeamModel
}