const appToLaunch = require("./index.ts");

const { PORT = 8000, SERVER_URL } = process.env;
// console.log(SERVER_URL);


// app start
const appStart = () => {
  try {
    appToLaunch.listen(PORT, () => {
      // console.log(`The server is running at http://localhost:${PORT}`);
      console.log(`The server is running at ${SERVER_URL}`);
    });
  } catch (error: any) {
    console.log(`Error: ${error.message}`);
  }
};

appStart();
export {};
