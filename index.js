const Application = require('./app/server');

const DB_URL = "mongodb://localhost:27017/ProjectManager_DB";

new Application(DB_URL, 3000);