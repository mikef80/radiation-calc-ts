const db = require("../../db");
import { Request, Response, NextFunction } from "express";
const { getCalculations } = require("../models/data-models");

exports.getCalcs = async (req: Request, res: Response, next: NextFunction) => {
  /* try {
    if (req.user) {
      const id = req.user["id"];

      const { rows } = await db.query(
        `SELECT * FROM calculations WHERE user_id = $1 ORDER BY calculation_date_time DESC;`,
        [id]
      );

      res.status(200).send({ calculations: rows });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  } */
  getCalculations(req.user)
    .then((rows) => {
      res.status(200).send({ calculations: rows });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCalc = async (req: Request, res: Response) => {
  const {
    calculation_date_time,
    calculation_type,
    current_doserate,
    current_distance,
    new_operating_distance,
    new_doserate,
    calculation_unit,
    distance_unit,
  } = req.body;

  try {
    if (req.user) {
      const user_id = req.user["id"];

      const { rows } = await db.query(
        `INSERT INTO calculations (calculation_date_time, user_id, calculation_type, current_doserate, current_distance, new_operating_distance, new_doserate, calculation_unit, distance_unit)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *`,
        [
          calculation_date_time,
          user_id,
          calculation_type,
          current_doserate,
          current_distance,
          new_operating_distance,
          new_doserate,
          calculation_unit,
          distance_unit,
        ]
      );

      res.status(201).send({ calculation: rows[0] });
    }
  } catch (error: any) {
    // console.log(error.message);
    res.status(500).send({ error: error.message });
  }
};
