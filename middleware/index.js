const authUser = require("./auth.middleware");
const authUrl = require("./url.middleware");

// index file for middlewares
module.exports = {
  authUser,
  authUrl,
};
