const express = require("express"); //import express framework
const app = express(); // creates instance of an Express application, used to configure routes, middlewares and other features
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config(); //imports "dotenv" module
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.static("./public")); //"express.static("./public")" creates a middleware that serves static files from the directory ("./public"). app.use(...) binds the middleware to the app
app.use(express.json()); //built-in middleware that parses incoming JSON requests payloads and makes them available in "req.body"

//routes
app.use("/api/v1/tasks", tasks); // "tasks" variable holds the router middleware that handles routes related to tasks.
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
