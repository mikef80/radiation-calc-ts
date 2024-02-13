const format = require("pg-format");
const db = require("../index.ts");
const { hash } = require("bcryptjs");

const seed = ({ userData }) => {
  return db
    .query(`DROP TABLE IF EXISTS users`)
    .then(() => {
      const usersTablePromise = db.query(`
      CREATE TABLE users (
        user_id SERIAL NOT NULL,
        firstname VARCHAR NOT NULL,
        lastname VARCHAR NOT NULL,
        email VARCHAR PRIMARY KEY,
        password VARCHAR NOT NULL
    )`);

      return Promise.all([usersTablePromise]);
    })
    .then(() => {
      const mappedData = userData.map(({ firstname, lastname, email, password }) => {
        return [firstname, lastname, email, password];
      });

      const insertUsersQueryStr = format(
        "INSERT INTO users (firstname, lastname, email, password) VALUES %L;",
        mappedData
      );
      const usersPromise = db.query(insertUsersQueryStr);

      return Promise.all([usersPromise]);
    });
};

module.exports = seed;
