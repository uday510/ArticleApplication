const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const articleRoutes = require("./article.routes");

// index file for all routes
module.exports = (app) => {
  authRoutes(app), // Routes to authRoutes file
    userRoutes(app), // Routes to userRoutes file 
    articleRoutes(app); // Routes to articleRoutes file 
};
