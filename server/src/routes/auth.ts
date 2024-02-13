const { Router } = require("express");
const { register, login } = require("../controllers/auth");
const { registerValidation, loginValidation } = require("../validators/auth");
const { validationMiddleware } = require("../middlewares/validation-middleware");
const authRouter = Router();

// auth routes
authRouter.post("/register", registerValidation, validationMiddleware, register);
authRouter.post("/login", loginValidation, validationMiddleware, login);

module.exports = authRouter;
