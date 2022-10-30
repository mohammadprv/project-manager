module.exports = class Application {
    #express = require('express');
    #app = this.#express();
    
    constructor(DB_URL, PORT) {
        this.configDatabase(DB_URL);
        this.configApplication();
        this.createServer(PORT);
        this.errorHandler();
    }
    
    configApplication() {
        const path = require('path');
        this.#app.use(this.#express.json());
        this.#app.use(this.#express.urlencoded({ extended: false }));
        this.#app.use(this.#express.static(path.join(__dirname, "..", "public")));
    }
    
    createServer(PORT) {
        const http = require('http');
        const server = http.createServer(this.#app);
        server.listen(PORT, () => {
            console.log(`Server Is Up And Online => http://localhost:${PORT}`);
        });
    }
    
    configDatabase(DB_URL) {
        const mongoose = require('mongoose');
        
        mongoose.connect(DB_URL, (error) => {
            if(error) throw error;
            return console.log("Connected To Database...");
        })
    }

    createRoutes() {
        this.#app.get("/", (req, res, next) => {
            return res.json({
                message: "This Is A New Express Application"
            })
        })
    }
    
    errorHandler() {

        //? 404 Handler
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "صفحه مورد نظر یافت",
            });
        });

        //? Error Handler
        this.#app.use((err, req, res, next) => {
            const statusCode = err?.status || 500;
            const message = err?.message || "Internal Server Error";

            res.status(statusCode).json({
                status: statusCode,
                success: false,
                message
            })
        });

    }

}