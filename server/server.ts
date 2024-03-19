const cronSchedule = require("./src/api/utils/keep-alive");

const src = require("./src/listen.ts");
cronSchedule.start();
