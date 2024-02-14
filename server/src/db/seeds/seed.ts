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
      const mappedData = userData.map(async ({ firstname, lastname, email, password }) => {
        const hashedPassword = await new Promise((resolve, reject) => {
          hash(password, 10, (err, hash) => {
            if (err) reject(err);
            resolve(hash);
          });
        });

        return [firstname, lastname, email, hashedPassword];
      });

      return Promise.all(mappedData);
    })
    .then((mappedData) => {
      const insertUsersQueryStr = format(
        "INSERT INTO users (firstname, lastname, email, password) VALUES %L;",
        mappedData
      );
      const usersPromise = db.query(insertUsersQueryStr);

      return Promise.all([usersPromise]);
    });
};

module.exports = seed;
