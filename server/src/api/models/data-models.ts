const db = require("../../db");
const { checkUserExists } = require("../models/auth-models");

exports.getCalculations = async (user) => {
  const id = user["id"];

  const userExists = await checkUserExists(user);

  if (userExists) {
    return db
      .query(
        `SELECT * FROM calculations WHERE user_id = $1 ORDER BY calculation_date_time DESC;`,
        [id]
      )
      .then(({ rows }) => {
        return rows;
      });
  }

  return Promise.reject({ status: 400, msg: "User not found" });
};
