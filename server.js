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
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB --> replace with localhost / heroku info
mongoose.connect(process.env.MONGODB_URI ||"mongodb://will:password123@ds019806.mlab.com:19806/heroku_7n79k02g");
// "mongodb://localhost/imdbu"
// "mongodb://will:password123@ds019806.mlab.com:19806/heroku_7n79k02g"
// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
