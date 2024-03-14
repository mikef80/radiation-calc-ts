const { Router } = require("express");
const {
  register,
  login,
  logout,
  getEndpoints,
  agreeToTerms,
} = require("../api/controllers/auth-controllers");
const { registerValidation, loginValidation } = require("../validators/auth");
const { validationMiddleware } = require("../middlewares/validation-middleware");
const { userAuth } = require("../middlewares/auth-middleware");
const authRouter = Router();

// auth routes

authRouter.post("/register", registerValidation, validationMiddleware, register);
authRouter.post("/login", loginValidation, validationMiddleware, login);

authRouter.get("/logout", logout);
authRouter.get("/", getEndpoints);

authRouter.post("/terms", userAuth, agreeToTerms);

module.exports = authRouter;
