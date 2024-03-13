import { NextFunction, Request, Response } from "express";

const passportAuth = require("passport");

exports.userAuth = (req: Request, res: Response, next: NextFunction) => {
  passportAuth.authenticate("jwt", { session: false })(req, res, next);
};
