import { NextFunction, Request, Response } from "express";

const passportAuth = require("passport");

exports.userAuth = (req: Request, res: Response, next: NextFunction) => {
  passportAuth.authenticate("jwt", { session: false })(
    req,
    res,
    next
  );
};

// PICK IT UP HERE - USER DETAILS NOT BEING PASSED WITH REQUESTS
// **SAME SITE NEEDS TO BE FALSE!**
