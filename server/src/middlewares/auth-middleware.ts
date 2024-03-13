import { NextFunction, Request, Response } from "express";

const passportAuth = require("passport");

/* exports.userAuth = (req: Request, res: Response, next: NextFunction) => {
  passportAuth.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!user) {
      console.log("no user");
      return res.status(401).json({ message: "Auth Failed" });
    }

    console.log("all fine");
    return res.status(200).json({ message: "Auth Passed" });
  })(req, res, next);
}; */

exports.userAuth = (req: Request, res: Response, next: NextFunction) => {
  passportAuth.authenticate("jwt", { session: false })(req, res, next);
};
