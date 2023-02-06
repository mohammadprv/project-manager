const { TeamController } = require('../http/controllers/team.controller');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { expressValidatorMapper } = require('../http/middlewares/checkError');
const { createTeamValidator } = require('../http/validation/team');

const router = require('express').Router();

//? Create New Team
router.post("/create", checkLogin, createTeamValidator(), expressValidatorMapper, TeamController.createTeam);

//? Get All Teams
router.get("/list", TeamController.getListOfTeams);

module.exports = {
    teamRoutes: router
}