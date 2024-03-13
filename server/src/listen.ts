const appToLaunch = require("./index.ts");

const { PORT = 8000 } = process.env;

// app start
const appStart = () => {
  try {
    appToLaunch.listen(PORT, () => {
      console.log(`The server is running on port ${PORT}`);
    });
  } catch (error: any) {
    console.log(`Error: ${error.message}`);
  }
};

appStart();
export {};
