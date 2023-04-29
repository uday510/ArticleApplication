const articleController = require("../controllers/article.controller");
const { authUser, authArticle } = require("../middleware");

module.exports = (app) => {
  app.post(
    "/api/users/:userId/articles",
    [authUser.verifyToken, authArticle.validateArticleDetails],
    articleController.createArticle
  ); // for article creation

// for article details
  app.get(
    "/api/articles",
    [authUser.verifyToken],
    articleController.fetchAllArticles
  ); // for article details
};
