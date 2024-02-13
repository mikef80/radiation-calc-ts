const db = require("../db");
const { hash } = require("bcryptjs");
import { Request, Response } from "express";

exports.register = async (req: Request, res: Response) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const hashedPassword = await hash(password, 10);
    await db.query(
      "insert into users(firstname, lastname, email, password) values ($1, $2, $3, $4)",
      [firstname, lastname, email, hashedPassword]
    );

    return res.status(201).send({ success: true, message: "The registration was successful" });
  } catch (error: any) {
    console.log(error.message);
    res.send(500).send({ error: error.message });
  }
};

exports.login = () => {
  console.log("here");
};
