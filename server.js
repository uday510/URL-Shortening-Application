const express = require("express");
const serverConfig = require("./configs/server.config");
const bodyParser = require("body-parser");

const app = express(); // Initialize express instance


console.clear(); // clear the console to remove previous logging

function requestTime(req, res, next) {
    process.stdout.write(`Request-Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} IST, `);
    next();
}

app.use(requestTime); // logs request time
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes")(app) // Initialize the route/s

console.log(serverConfig.HOST);
//Initialize the express server
module.exports = app.listen( (serverConfig.HOST, serverConfig.PORT), () => {
    console.log(`URL-Shortening Application Running on ${serverConfig.HOST}:${serverConfig.PORT}`);
});



