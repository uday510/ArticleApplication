const User = require("../models/user.model");
const Article = require("../models/article.model");
const objectConverter = require("../utils/objectConverter");

// for article creation
exports.createArticle = async (req, res) => {
  const user = await User.findOne({ userId: req.userId });

  // check for userId in params
  if (!req.params.userId) {
    return res.status(400).send({
      statusCode: 400,
      message: "User Id not provided",
    });
  }

  if (req.params.userId != req.userId) {
    return res.status(400).send({
      statusCode: 400,
      message: "User Id provided is incorrect",
    });
  }
  // Obj to be stored in DB
  const articleObjToBeStoredInDB = {
    userId: user._id,
    title: req.body.title,
    description: req.body.description,
  };

  // DB URL Creation
  const articleCreated = await Article.create(articleObjToBeStoredInDB);

  if (articleCreated) {
    // if the url successfully create
    // store the url id in the user database
    const user = await User.findOne({
      userId: req.userId,
    });

    // add the article id user articles array
    user.articlesCreated.push(articleCreated);

    // save the user into DB
    await user.save();

    // return the response
    return res.status(201).send({
      statusCode: 201,
      data: articleCreated,
      message: "Article created Successfully",
    });
  }
};

// To fetch all the articles
exports.fetchAllArticles = async (req, res) => {
  try {
    const userId = req.userId; // get the userId from Token

    const user = await User.findOne({ userId: userId }); // fetch the user

    const queryObj = {}; // object for storing articles

    queryObj._id = {
      $in: user.articlesCreated, // Obj to search in article DB.
    };

    const urls = await Article.find(queryObj); // returns the array of url's

    // return the response
    res.status(200).send({
      statusCode: 200,
      // data: objectConverter.urlListResponse(urls), // convert the urls for better readability
      data: urls, // convert the urls for better readability
      message: "Fetched Articles successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error while fetching URL's",
      error: err.message,
    });
  }
};
