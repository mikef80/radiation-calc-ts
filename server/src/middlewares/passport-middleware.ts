const passport = require("passport");
const { Strategy } = require("passport-jwt");
const { SECRET } = require("../constants");
const ppDb = require("../db");

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) token = req.cookies["token"];
  return token;
};

const opts = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: cookieExtractor,
};

passport.use(
  new Strategy(opts, async ({ id }, done) => {
    try {
      console.log("passport-middleware.js is doing something!");

      const { rows } = await ppDb.query(
        `SELECT user_id, firstname, lastname, email FROM users WHERE user_id = $1`,
        [id]
      );

      if (!rows.length) {
        throw new Error("401 not authorised");
      }

      let user = { id: rows[0].user_id, email: rows[0].email };

      return await done(null, user);
    } catch (error: any) {
      console.log(error.msg);
      done(null, false);
    }
  })
);
