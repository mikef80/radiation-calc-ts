const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "radcalc",
  password: "root",
  port: 5432,
});

module.exports = {
  query: (text: any, params: any) => pool.query(text, params),
};
