const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const urlRoutes = require("./url.routes");

// index file for all routes
module.exports = (app) => {
    authRoutes(app), // Routes to authRoutes file for auth urls
    userRoutes(app), // Routes to userRoutes file for user urls
    urlRoutes(app) // Routes to urlRoutes file for url urls
}
