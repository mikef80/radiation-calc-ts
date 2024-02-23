const db = require("../db");
import { Request, Response } from "express";

exports.getCalcs = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      console.log(req.user);

      const email = req.user["email"];
      const id = req.user["id"];
      console.log(email, id, "<-- controllers/data.ts");

      const { rows } = await db.query(`SELECT * FROM calculations WHERE user_id = $1;`, [id]);

      res.status(200).send({ rows });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
};