const urlController = require("../controllers/url.controller");
const { authUser, authUrl } = require("../middleware/index");

module.exports = (app) => {
  app.post(
    "/app/api/v1/urls/",
    [authUser.verifyToken, authUrl.validateUrl],
    urlController.createShortUrl
  );

  app.get(
    "/app/api/v1/urls/",
    [authUser.verifyToken],
    urlController.fetchAllUrls
  );

  app.get(
    "/app/api/v1/urls/:urlId",
    [authUser.verifyToken],
    urlController.fetchUrl
  );

  app.patch(
    "/app/api/v1/urls/:urlId",
    [authUser.verifyToken, authUrl.isValidUrl],
    urlController.updateUrl
  );
};
