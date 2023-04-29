validateArticleDetails = (req, res, next) => {
  if (!req.body.title) {
    return res.status(400).send({
      statusCode: 400,
      message: "Failed ! title is not provided",
    });
  }
  if (!req.body.description) {
    return res.status(400).send({
      statusCode: 400,
      message: "Failed ! description is not provided",
    });
  }
  next();
};

// Exposing the functions to outside of this file
const authArticle = {
  validateArticleDetails: validateArticleDetails,
};

module.exports = authArticle;
