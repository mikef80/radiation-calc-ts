const { Router } = require("express");
const { register } = require("../controllers/auth");
const { registerValidation } = require("../validators/auth");
const { validationMiddleware } = require("../middlewares/validation-middleware");
const authRouter = Router();

// auth routes
authRouter.post("/register", registerValidation, validationMiddleware, register);

module.exports = authRouter;
