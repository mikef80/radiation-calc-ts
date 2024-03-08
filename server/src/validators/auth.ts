const { check } = require("express-validator");
const db = require("../db");
const { compare } = require("bcryptjs");
import { Request } from "express";

// check password is valid
const password = check("password")
  .isLength({ min: 6, max: 15 })
  .withMessage("Password has to be between 6 and 15 characters.");

// check email is valid
const email = check("email").isEmail().withMessage("Please provide a valid email.");

// check firstname is valid
const firstname = check("firstname")
  .isLength({ min: 1 })
  .withMessage("Please provide a firstname.");

// check lastname is valid
const lastname = check("lastname")
  .isLength({ min: 1 })
  .withMessage("Please provide a lastname.");

// check if email already exists
const emailExists = check("email").custom(async (email: Text) => {
  const { rows } = await db.query("select * from users where email = $1", [email]);

  if (rows.length) {
    throw new Error("Email already exists.");
  }
});

// login validation
const loginFieldsCheck = check("email").custom(
  
  async (value: Text, { req }: { req: Request }) => {
    const user = await db.query("select * from users where email = $1", [value]);

    if (!user.rows.length) {
      throw new Error("Email does not exist.");
    }

    const validPassword = await compare(req.body.password, user.rows[0].password);

    if (!validPassword) {
      throw new Error("Wrong password.");
    }

    req.user = user.rows[0];
  }
);

module.exports = {
  registerValidation: [email, password, emailExists, firstname, lastname],
  loginValidation: [loginFieldsCheck],
};
