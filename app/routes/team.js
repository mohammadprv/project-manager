const { TeamController } = require('../http/controllers/team.controller');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { expressValidatorMapper } = require('../http/middlewares/checkError');
const { mongoIDValidator } = require('../http/validation/public');
const { createTeamValidator } = require('../http/validation/team');

const router = require('express').Router();

//? Create New Team
router.post("/create", checkLogin, createTeamValidator(), expressValidatorMapper, TeamController.createTeam);

//? Get All Teams
router.get("/list", TeamController.getListOfTeams);

//? Get My Teams
router.get("/me", checkLogin, TeamController.getMyTeams);

//? Get Team By ID
router.get("/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, TeamController.getTeamByID);

//? Invite User To Team
router.get("/invite/:teamID/:username", checkLogin, TeamController.inviteUserToTeam);

//? Delete Team By ID
router.delete("/remove/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, TeamController.removeTeamById)

module.exports = {
    teamRoutes: router
}