const format = require("pg-format");
const db = require("../index.ts");
const { hash } = require("bcryptjs");

const seed = ({ userData, calculationsData }) => {
  return db
    .query(`DROP TABLE IF EXISTS calculations CASCADE;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users CASCADE;`);
    })
    .then(() => {
      console.log("1");

      const usersTablePromise = db.query(`
          CREATE TABLE users (
            user_id SERIAL UNIQUE NOT NULL,
            firstname VARCHAR NOT NULL,
            lastname VARCHAR NOT NULL,
            email VARCHAR PRIMARY KEY,
            password VARCHAR NOT NULL,
            terms VARCHAR NOT NULL,
            termsagreed BOOLEAN NOT NULL
        );`);

      return Promise.all([usersTablePromise]);
    })
    .then(() => {
      console.log("2");
      const calculationsTablePromise = db.query(`
      CREATE TABLE calculations (
        calculation_id SERIAL PRIMARY KEY NOT NULL,
        calculation_date_time VARCHAR NOT NULL,
        user_id SERIAL NOT NULL REFERENCES users(user_id),
        calculation_type VARCHAR NOT NULL,
        current_doserate DECIMAL NOT NULL,
        current_distance DECIMAL NOT NULL,
        new_operating_distance DECIMAL NOT NULL,
        new_doserate DECIMAL NOT NULL,
        calculation_unit VARCHAR(6) NOT NULL,
        distance_unit VARCHAR NOT NULL
    );`);

      return Promise.all([calculationsTablePromise]);
    })
    .then(async () => {
      console.log("3");
      const mappedUserData = await userData.map(
        async ({ firstname, lastname, email, password, terms, termsagreed }) => {
          const hashedPassword = await new Promise((resolve, reject) => {
            hash(password, 10, (err, hash) => {
              if (err) reject(err);
              resolve(hash);
            });
          });

          return { firstname, lastname, email, hashedPassword, terms, termsagreed };
        }
      );

      return Promise.all(mappedUserData);
    })
    .then((mappedUserData) => {
      console.log("4");
      const insertUsersQueryStr = format(
        "INSERT INTO users (firstname, lastname, email, password, terms, termsagreed) VALUES %L;",
        mappedUserData.map(
          ({ firstname, lastname, email, hashedPassword, terms, termsagreed }) => [
            firstname,
            lastname,
            email,
            hashedPassword,
            terms,
            termsagreed,
          ]
        )
      );

      const usersPromise = db.query(insertUsersQueryStr);

      return Promise.all([usersPromise]);
    })
    .then(() => {
      console.log("5");
      const insertCalcQueryStr = format(
        "INSERT INTO calculations (calculation_date_time, user_id, calculation_type, current_doserate, current_distance, new_operating_distance, new_doserate, calculation_unit, distance_unit) VALUES %L;",
        calculationsData.map(
          ({
            calculation_date_time,
            user_id,
            calculation_type,
            current_doserate,
            current_distance,
            new_operating_distance,
            new_doserate,
            calculation_unit,
            distance_unit,
          }) => [
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
      );

      const calcsPromise = db.query(insertCalcQueryStr);

      return Promise.all([calcsPromise]);
    });
};

module.exports = seed;
