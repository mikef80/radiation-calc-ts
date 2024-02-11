const express = require("express");
const app = express();
const { PORT, CLIENT_URL } = require("./constants");

// initialised middlewares
app.use(express.json());

// import routes
const authRoutes = require("./routes/auth");

// initialise routes
app.use("/api", authRoutes);

// app start
const appStart = () => {
  try {
    app.listen(PORT, () => {
      console.log(`The app is running at http://localhost:${PORT}`);
    });
  } catch (error: any) {
    console.log(`Error: ${error.message}`);
  }
};

appStart();
