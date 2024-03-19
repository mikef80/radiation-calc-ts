// KEEP CONNECTION ALIVE

const cron = require("node-cron");

const cronSchedule = cron.schedule("*/14 * * * *", () => {
  console.log("keep alive");
  fetch("https://radiation-calc-ts.onrender.com/api");
});

module.exports = cronSchedule;
