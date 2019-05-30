// Dependencies
var express = require("express");
var bodyParser = require("body-parser"); //JSON responses
var mongoose = require("mongoose"); //Mongo object modelling 
var request = require("request"); //Makes http calls
var cheerio = require("cheerio"); //Scraper

// Require all models
var db = require("./models");

// Port configuration for local/Heroku
var PORT = process.env.PORT || 3003;

// Initialize Express
var app = express();

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));
// Controllers
var router = require("./controllers/api.js");
app.use(router);
// Connect to the Mongo DB
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);
mongoose.Promise = Promise;


// Start the server
app.listen(PORT, function () {
    console.log("App is running on" + PORT + "!");
});