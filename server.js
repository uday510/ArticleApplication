const express = require("express");
const mongoose = require("mongoose");
const serverConfig = require("./configs/server.config");
const bodyParser = require("body-parser");
const dbConfig = require("./configs/db.config");
const app = express(); // Initialize express instance

console.clear(); // clear the console to remove previous logging

// Logs time for every request
function requestTime(req, res, next) {
  process.stdout.write(
    `Request-Date: ${new Date().toString()} ${req.method} ${req.url} \n`
  );
  next();
}

app.use(requestTime); // logs request time
app.use(bodyParser.json()); // used to parse the request and extract the information
app.use(bodyParser.urlencoded({ extended: true }));

// for testing purposes
app.get("/", (req, res) => {
  res.send("Welcome to Article Application!");
});

require("./routes")(app); // Initialize the route/s

// Connect to the Database
mongoose
  .connect(dbConfig.DB_URL, {
    useNewUrlParser: true, // To avoid Deprecation Warning
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connecting to MongoDB Atlas...`);
    console.log(`Connection established`);
  })
  .catch((err) => {
    console.log(err.message);
  });

//Initialize the express server
module.exports = app.listen((serverConfig.HOST, serverConfig.PORT), () => {
  console.log(
    `Article Application Running on PORT ${serverConfig.PORT}`
  );
});
