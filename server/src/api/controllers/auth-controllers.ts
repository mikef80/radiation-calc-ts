const { sign } = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
const { registerUser, loginUser } = require("../models/auth-models");

exports.register = async (req: Request, res: Response, next: NextFunction) => {
  registerUser(req.body)
    .then((user_id) => {
      return res
        .status(201)
        .send({ success: true, msg: "The registration was successful", user_id });
    })
    .catch(next);
};

exports.login = async (req: Request, res: Response, next: NextFunction) => {
  let user;
  if (req.user) {
    user = req.user;
  }

  loginUser(user)
    .then((token) => {
      return res
        .status(200)
        .cookie("token", token, { httpOnly: true })
        .send({ success: true, message: "Logged in successfully" });
    })
    .catch(next);
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

/* exports.restricted = async (req: Request, res: Response) => {
  try {
    return res.status(200).send({ info: "protected info" });
  } catch (error: any) {
    console.log(error.message);
  }
}; */
