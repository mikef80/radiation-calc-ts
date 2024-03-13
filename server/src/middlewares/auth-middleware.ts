import { NextFunction, Request, Response } from "express";

const passportAuth = require("passport");

exports.userAuth = (req: Request, res: Response, next: NextFunction) => {
  passportAuth.authenticate("jwt", { session: false }, (err, user, info) => {
    if (!user) {
      console.log(err, "<==err");

      console.log("NO USER!");
    }
  })(req, res, next);
};
