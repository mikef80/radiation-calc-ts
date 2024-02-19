const db = require("../db");
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
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
    res.status(500).send({ error: error.message });
  }
};

exports.login = async (req: Request, res: Response) => {
  let user;
  if (req.user) {
    user = req.user;
  }

  const payload = {
    id: user.user_id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  };

  try {
    const token = sign(payload, process.env.SECRET);

    return res
      .status(200)
      .cookie("token", token, { httpOnly: true })
      .send({ success: true, message: "Logged in successfully" });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
};

exports.protected2 = async (req, res) => {
  try {
    return res.status(200).send({ info: "protected info" });
  } catch (error:any) {
    console.log(error.message);
  }
};

exports.logout = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("token", { httpOnly: true })
      .send({ success: true, message: "Logged out successfully" });
  } catch (error:any) {
    console.log(error.message);
    res.send(500).send({ error: error.message });
  }
};
