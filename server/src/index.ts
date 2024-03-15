const express = require("express");
const app = express();
const { PORT = 8000, CLIENT_URL } = require("./constants");
const cookieParser = require("cookie-parser");
const passport2 = require("passport");
const cors = require("cors");
const { handlePSQLErrors, handleCustomErrors, handleServerErrors } = require("./api/errors");
import serverless from "serverless-http";

// import passport middleware
require("./middlewares/passport-middleware");

// initialised middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
/* app.use(cors({ origin: "https://radiation-calculator.netlify.app", credentials: true })); */
app.use(passport2.initialize());

// import routes
const authRoutes = require("./routes/auth");
const dataRoutes = require("./routes/data");

// initialise routes
app.use("/api", authRoutes);
app.use("/data", dataRoutes);

// error handlers
app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleServerErrors);

// module.exports = app;
export const handler = serverless(app);
