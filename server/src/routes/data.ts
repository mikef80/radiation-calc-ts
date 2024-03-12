import { Router as DataRouter } from "express";
const { getCalcs, postCalc } = require("../api/controllers/data-controllers");
const { userAuth } = require("../middlewares/auth-middleware");
const dataRouter = DataRouter();

// data routes
dataRouter.get("/calcs", userAuth, getCalcs);
dataRouter.post("/calcs", userAuth, postCalc);

module.exports = dataRouter;
