// Setting up routes to handle POST requests
// router.post: This is setting up a route for handling HTTP POST requests.
// ("/register"): This specifies the URL path for the route. In this case, it's "/register".
// register: This is the function that will be called when a POST request is made to "/register".

const express = require("express");
const router = express.Router();

const { login, register } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
