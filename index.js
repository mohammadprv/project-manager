const Application = require('./app/server');

const dotEnv = require('dotenv');


const DB_URL = "mongodb://localhost:27017/ProjectManager_DB";
dotEnv.config();

new Application(DB_URL, 3000);