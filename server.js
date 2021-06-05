const http = require('http');
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
// const { db } = require("./models/exercise");
const db = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

//LOCAL MONGO DB IN CASE I YOU NEED IT
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/imageperformance", {
//   useNewUrlParser: true
// });

// mongoose.connect("mongodb+srv://appadmin:password_12345@cluster0.bf1i0.mongodb.net/fitnessTrackerDb?retryWrites=true&w=majority", {
//   useNewUrlParser: true
// });

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb+srv://appadmin:password_12345@cluster0.bf1i0.mongodb.net/fitnessTrackerDb?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

app.listen(PORT, function() {
  console.log(`Now listening on port: ${PORT}`);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./public/index2.html"));
});
