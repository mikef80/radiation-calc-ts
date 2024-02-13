const format = require("pg-format");
const db = require("../index.ts");

const seed = ({ userData }) => {
  return db
    .query(`DROP TABLE IF EXISTS users`)
    .then(() => {
      const usersTablePromise = db.query(`CREATE TABLE users (
      firstname VARCHAR NOT NULL,
      lastname VARCHAR NOT NULL,
      email VARCHAR PRIMARY KEY,
      password VARCHAR NOT NULL
    )`);

      return Promise.all([usersTablePromise]);
    })
    .then(() => {
      const insertUsersQueryStr = format(
        "INSERT INTO users (firstname, lastname, email, password) VALUES %L;",
        userData.map(({ firstname, lastname, email, password }) => [
          firstname,
          lastname,
          email,
          password,
        ])
      );
      const usersPromise = db.query(insertUsersQueryStr);

      return Promise.all([usersPromise]);
    });
};

module.exports = seed;
