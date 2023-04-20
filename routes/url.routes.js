const urlController = require("../controllers/url.controller");
const { authUser, authUrl } = require("../middleware/index");

module.exports = (app) => {
  app.post(
    "/app/api/v1/urls/",
    [authUser.verifyToken, authUrl.validateUrl],
    urlController.createShortUrl
  ); // for creating the short url

  app.get(
    "/app/api/v1/urls/",
    [authUser.verifyToken],
    urlController.fetchAllUrls
  ); // for fetching all the urls

  app.get(
    "/app/api/v1/urls/:urlId",
    [authUser.verifyToken],
    urlController.fetchUrl
  ); // for fetching the one url

  app.patch(
    "/app/api/v1/urls/:urlId",
    [authUser.verifyToken, authUrl.isUrlExists, authUrl.isValidUrl],
    urlController.updateUrl
  ); // for updating the existing url

  app.delete(
    "/app/api/v1/urls/:urlId",
    [authUser.verifyToken, authUrl.isValidUrl],
    urlController.deleteUrl
  ); // for deleting the existing url

};
