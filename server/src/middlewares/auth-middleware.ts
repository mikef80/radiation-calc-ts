const authPassport = require("passport");

exports.userAuth = authPassport.authenticate("jwt", { session: false });
