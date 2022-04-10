const express = require("express");
const app = express();
// body parser to post json data in to database
const bodyParser = require("body-parser");
// Load Mongoose
const mongoose = require("mongoose");
// dotenv
const { DB_URI } = require("./src/config");
// route
const jobPostRoute = require("./src/routes/jobPostRoute");

app.use(bodyParser.json());

mongoose
  .connect(DB_URI)
  .then(console.log(" Database is up and running"))
  .catch((err) => console.log(err));

// setting the route for the book

app.use("/microservice/accountService/employer/jobPost", jobPostRoute);

app.listen(5000, () => {
  console.log("Job Service is up and running!");
});
