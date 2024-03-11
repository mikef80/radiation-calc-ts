const { sign } = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
const { registerUser } = require("../models/auth-models");

exports.register = async (req: Request, res: Response, next: NextFunction) => {
  registerUser(req.body)
    .then((user_id) => {
      res.status(201).send({ success: true, msg: "The registration was successful", user_id });
    })
    .catch(next);
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
    res.status(500).send({ error: error.message });
  }
};

exports.logout = async (req: Request, res: Response) => {
  try {
    return res
      .status(200)
      .clearCookie("token", { httpOnly: true })
      .send({ success: true, msg: "Logged out successfully" });
  } catch (error: any) {
    console.log(error.message);
    res.send(500).send({ error: error.message });
  }
};

exports.restricted = async (req: Request, res: Response) => {
  try {
    return res.status(200).send({ info: "protected info" });
  } catch (error: any) {
    console.log(error.message);
  }
};
