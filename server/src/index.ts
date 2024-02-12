const express = require("express");
const app = express();
const { PORT = 8000, CLIENT_URL } = require("./constants");

// initialised middlewares
app.use(express.json());

// import routes
const authRoutes = require("./routes/auth");

// initialise routes
app.use("/api", authRoutes);

module.exports = app;
