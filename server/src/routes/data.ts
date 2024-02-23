import { Router as DataRouter } from "express";
const { getCalcs } = require("../controllers/data");
const { userAuth } = require("../middlewares/auth-middleware");
const dataRouter = DataRouter();

// data routes
dataRouter.get("/calcs", userAuth, getCalcs);

module.exports = dataRouter;
