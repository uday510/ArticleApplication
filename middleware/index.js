const authUser = require("./auth.middleware");
const authArticle = require("./article.middleware");

// index file for middlewares
module.exports = {
  authUser,
  authArticle,
};
