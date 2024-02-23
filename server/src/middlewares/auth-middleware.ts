const passportAuth = require("passport");

exports.userAuth = (req, res, next) => {
  console.log("***auth-middleware.ts start***");

  passportAuth.authenticate("jwt", { session: false })(req, res, next);  

  console.log("***auth-middleware.ts finish***");
};
