// This will be the prototype server for the imdbu model app 

const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

require("./routes/api/index.js")(app);
// require("./app/routes/html-routes.js")(app);

// Connect to the Mongo DB --> replace with localhost / heroku info
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/imdbu");

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
