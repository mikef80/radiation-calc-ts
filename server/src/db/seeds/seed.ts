const format = require("pg-format");
const db = require("../index.ts");
const { hash } = require("bcryptjs");

const seed = ({ userData, calculationsData }) => {
  return (
    db
      .query(`DROP TABLE IF EXISTS calculations;`)
      .then(() => {
        console.log("1");

        return db.query(`DROP TABLE IF EXISTS users;`);
      })
      .then(() => {
        console.log("2");
        const usersTablePromise = db.query(`
          CREATE TABLE users (
            user_id SERIAL UNIQUE NOT NULL,
            firstname VARCHAR NOT NULL,
            lastname VARCHAR NOT NULL,
            email VARCHAR PRIMARY KEY,
            password VARCHAR NOT NULL
        );`);

        console.log("3");

        const calculationsTablePromise = db.query(`
          CREATE TABLE calculations (
            calculation_id SERIAL PRIMARY KEY NOT NULL,
            calculation_date VARCHAR NOT NULL,
            user_id SERIAL NOT NULL REFERENCES users(user_id),
            calculation_type VARCHAR NOT NULL,
            current_doserate DECIMAL,
            current_distance DECIMAL,
            new_distance DECIMAL,
            new_doserate DECIMAL
        );`);
        console.log("3.5");

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

        console.log("4");
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

        const insertCalcQueryStr = format(
          "INSERT INTO calculations (calculation_date, user_id, calculation_type, current_doserate, current_distance, new_distance, new_doserate) VALUES %L;",
          calculationsData.map(
            ({
              calculation_date,
              user_id,
              calculation_type,
              current_doserate,
              current_distance,
              new_distance,
              new_doserate,
            }) => [
              calculation_date,
              user_id,
              calculation_type,
              current_doserate,
              current_distance,
              new_distance,
              new_doserate,
            ]
          )
        );

        const calcsPromise = db.query(insertCalcQueryStr);

        console.log("5");

        return Promise.all([usersPromise, calcsPromise]);
      })
  );

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
        "INSERT INTO calculations (user_id, calc_type, current_doserate, current_distance, new_distance, new_doserate) VALUES %L;",
        calculationsData
      );

      const calculationsPromise = db.query(insertCalculationsQueryStr);

      return Promise.all([usersPromise, calculationsPromise]);
    }); */
};

module.exports = seed;
