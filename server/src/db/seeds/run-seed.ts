const devData = require("../data/development-data/index.ts");
const seedFn = require("./seed.ts");
const seedDb = require("../index.ts");

const runSeed = () => {
  return seedFn(devData).then(() => seedDb.end());
};

runSeed();
