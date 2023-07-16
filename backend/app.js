const express = require("express");
const bodyParser = require("body-parser");
const UserRoute = require("./routes/user.routes");
const ToDoRoute = require("./routes/todo.router");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const env = require("dotenv").config();

const app = express();
const PORT = 3000; // Set the desired port number


  app.use(
    cors({
      methods: "GET,POST,PUT,DELETE,OPTIONS",
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(__dirname + "/../client/public"));
  app.use(cookieParser());
app.use(bodyParser.json());

app.use("/", UserRoute);
app.use("/", ToDoRoute);


app.listen(PORT, function () {
    console.log(`Server Runs Perfectly at http://localhost:${PORT}`);
  });
module.exports = app;
