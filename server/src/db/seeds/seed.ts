const format = require("pg-format");
const db = require("../index.ts");
const { hash } = require("bcryptjs");

const seed = ({ userData, calculationsData }) => {
  return db
    .query(`DROP TABLE IF EXISTS calculations;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      const usersTablePromise = db.query(`
          CREATE TABLE users (
            user_id SERIAL UNIQUE NOT NULL,
            firstname VARCHAR NOT NULL,
            lastname VARCHAR NOT NULL,
            email VARCHAR PRIMARY KEY,
            password VARCHAR NOT NULL
        );`);

      const calculationsTablePromise = db.query(`
          CREATE TABLE calculations (
            calculation_id SERIAL PRIMARY KEY NOT NULL,
            calculation_date_time VARCHAR NOT NULL,
            user_id SERIAL NOT NULL REFERENCES users(user_id),
            calculation_type VARCHAR NOT NULL,
            current_doserate DECIMAL,
            current_distance DECIMAL,
            new_operating_distance DECIMAL,
            new_doserate DECIMAL,
            calculation_unit VARCHAR(6) NOT NULL,
            distance_unit VARCHAR NOT NULL
        );`);

      return Promise.all([usersTablePromise, calculationsTablePromise]);
    })
    .then(async () => {
      const mappedUserData = await userData.map(
        async ({ firstname, lastname, email, password }) => {
          const hashedPassword = await new Promise((resolve, reject) => {
            hash(password, 10, (err, hash) => {
              if (err) reject(err);
              resolve(hash);
            });
          });

          return { firstname, lastname, email, hashedPassword };
        }
      );

      return Promise.all(mappedUserData);
    })
    .then((mappedUserData) => {
      const insertUsersQueryStr = format(
        "INSERT INTO users (firstname, lastname, email, password) VALUES %L;",
        mappedUserData.map(({ firstname, lastname, email, hashedPassword }) => [
          firstname,
          lastname,
          email,
          hashedPassword,
        ])
      );

      const usersPromise = db.query(insertUsersQueryStr);

      return Promise.all([usersPromise]);
    })
    .then(() => {
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

  /* .then(async () => {
      console.log("4");
      const mappedUserData = await userData.map(async ({ firstname, lastname, email, password }) => {
        const hashedPassword = await new Promise((resolve, reject) => {
          hash(password, 10, (err, hash) => {
            if (err) reject(err);
            resolve(hash);
          });
        });

        return [firstname, lastname, email, hashedPassword];
      });

      console.log(mappedUserData,'<--***');
      

      return Promise.all([mappedUserData]);
    }) */
  /* .then((mappedUserData) => {
      console.log("5");
      console.log(mappedUserData);

      const insertUsersQueryStr = format(
        "INSERT INTO users (firstname, lastname, email, password) VALUES %L;",
        mappedUserData
      );
      const usersPromise = db.query(insertUsersQueryStr);

      const insertCalculationsQueryStr = format(
        "INSERT INTO calculations (user_id, calc_type, current_doserate, current_distance, new_operating_distance, new_doserate) VALUES %L;",
        calculationsData
      );

      const calculationsPromise = db.query(insertCalculationsQueryStr);

      return Promise.all([usersPromise, calculationsPromise]);
    }); */
};

module.exports = seed;
