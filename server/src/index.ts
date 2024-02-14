const express = require("express");
const app = express();
const { PORT = 8000, CLIENT_URL } = require("./constants");
const cookieParser = require("cookie-parser");
const passport2 = require("passport");

// import passport mniddleware
require("./middlewares/passport-middleware");

// initialised middlewares
app.use(express.json());
app.use(cookieParser());
app.use(passport2.initialize());

// import routes
const authRoutes = require("./routes/auth");

// initialise routes
app.use("/api", authRoutes);


module.exports = app;
