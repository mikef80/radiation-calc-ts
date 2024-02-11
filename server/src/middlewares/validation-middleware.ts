const { validationResult } = require("express-validator");
import { Request, Response, NextFunction } from "express";

exports.validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  next();
};
