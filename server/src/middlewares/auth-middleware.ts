const passportAuth = require("passport");

exports.userAuth = passportAuth.authenticate("jwt", { session: false });
