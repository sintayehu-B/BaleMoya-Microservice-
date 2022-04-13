// Load Express
const express = require("express");
const app = express();
// body parser to post json data in to database
const bodyParser = require("body-parser");
// Load Mongoose
const mongoose = require("mongoose");
// dotenv
const { DB_URI } = require("./src/config");
// route
const userProfessionalRoute = require("./src/routes/professionalRoute");
const userCompanyRoute = require("./src/routes/companyRoute");
const userEducationalBackgroundRoute = require("./src/routes/educationalBackgroundRoute");
const userReferenceRoute = require("./src/routes/referenceRoute");
const userPreviousEducationRoute = require("./src/routes/previousEducationRoute");
const userProfessionRoute = require("./src/routes/professionRoute");

// app.use(express.json());
app.use(bodyParser.json());

mongoose
  .connect(DB_URI)
  .then(console.log(" Database is up and running"))
  .catch((err) => console.log(err));

// setting the route for the book
app.use("/microservice/accountService/employee", userProfessionalRoute);
app.use("/microservice/accountService/employer", userCompanyRoute);
app.use(
  "/microservice/accountService/employee/previousEducation",
  userPreviousEducationRoute
);
app.use(
  "/microservice/accountService/employee/educationalBackground",
  userEducationalBackgroundRoute
);
app.use("/microservice/accountService/employee/reference", userReferenceRoute);
app.use(
  "/microservice/accountService/employee/profession",
  userProfessionRoute
);

app.listen(5655, () => {
  console.log("Account Service is up and running!");
});
