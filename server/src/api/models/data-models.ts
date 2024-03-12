const db = require("../../db");
const { checkUserExists } = require("../models/auth-models");

exports.getCalculations = async (user) => {
  const user_id = user["id"];
  const userExists = await checkUserExists(user);

  if (userExists) {
    return db
      .query(
        `SELECT * FROM calculations WHERE user_id = $1 ORDER BY calculation_date_time DESC;`,
        [user_id]
      )
      .then(({ rows }) => {
        return rows;
      });
  }

  return Promise.reject({ status: 400, msg: "User not found" });
};

exports.postCalculations = async (body, user) => {
  const user_id = user["id"];
  const {
    calculation_date_time,
    calculation_type,
    current_doserate,
    current_distance,
    new_operating_distance,
    new_doserate,
    calculation_unit,
    distance_unit,
  } = body;

  const userExists = await checkUserExists(user);

  if (userExists) {
    return db
      .query(
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
      )
      .then(({ rows }) => {
        return rows;
      });
  }
  return Promise.reject({ status: 400, msg: "User not found" });
};
