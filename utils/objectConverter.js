// Remove password field from user object and send response to the user
exports.userObject = (user) => { 
  return {
    _id: user._id,
    name: user.name,
    userId: user.userId,
    email: user.email,
    urlsCreated: user.urlsCreated,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

// Generate the url list response from the list of urls
exports.urlListResponse = (urls) => {
  urlResult = [];
  urls.forEach(url => {
    urlResult.push({
      _id : url._id,
      urlId: url.urlId,
      originalUrl: url.originalUrl,
      shortUrl: url.shortUrl,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
    });
  });
  return urlResult;
}

// Generate the url response object from the url
exports.urlResponse = (url) => {
  return {
    urlId: url.urlId,
    originalUrl: url.originalUrl,
    shortUrl: url.shortUrl,
    createdAt: url.createdAt,
    updatedAt: url.updatedAt
  }
}