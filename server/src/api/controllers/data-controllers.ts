const db = require("../../db");
import { Request, Response, NextFunction } from "express";
const { getCalculations, postCalculations } = require("../models/data-models");

exports.getCalcs = async (req: Request, res: Response, next: NextFunction) => {
  getCalculations(req.user)
    .then((rows) => {
      res.status(200).send({ calculations: rows });
    })
    .catch(next);
};

exports.postCalc = async (req: Request, res: Response, next: NextFunction) => {
  const { body, user } = req;
  postCalculations(body, user)
    .then((rows) => {
      res.status(201).send({ calculation: rows[0] });
    })
    .catch(next);
};
