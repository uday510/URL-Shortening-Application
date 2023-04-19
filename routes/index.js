const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");
const urlRoutes = require("./url.routes");

module.exports = (app) => {
    userRoutes(app), // Routes to userRoutes file for user urls
    authRoutes(app), // Routes to authRoutes file for auth urls
    urlRoutes(app) // Routes to urlRoutes file for url urls
}