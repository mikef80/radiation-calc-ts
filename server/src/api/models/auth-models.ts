const db = require("../../db");
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

exports.registerUser = async (user) => {
  const { firstname, lastname, email, password } = user;
  const sql = `INSERT INTO users (firstname, lastname, email, password) 
    VALUES ($1, $2, $3, $4)
    RETURNING user_id, firstname, lastname, email`;

  const hashedPassword = await hash(password, 10);
  return db
    .query(sql, [firstname, lastname, email, hashedPassword])
    .then(({ rowCount, rows }) => {
      if (!rowCount) {
        return Promise.reject({ status: 400, msg: "User not created" });
      }

      return rows[0].user_id;
    });
};

exports.loginUser = async (user) => {
  const payload = {
    id: user.user_id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  };

  return sign(payload, process.env.SECRET);
};

exports.checkUserExists = async (user) => {
  return db.query(`SELECT * FROM users WHERE user_id = $1`, [user.id]).then((result) => {
    if (result.rows && result.rows.length) {
      return true;
    }
    return false;
  });
};