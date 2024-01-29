// Imports

const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const sequelize = require("./config/db");
require('dotenv').config();

// Models Import

const contactModel = require("./model/contactModel");
const userModel = require("./model/userModel");

// Server Config

const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection

sequelize
  .authenticate()
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database Connection Failed\n-->", err.message));

// Database Models Register

contactModel(sequelize);
userModel(sequelize);

sequelize.sync().then(() => {
  console.log("Database synced");
});

//   Middleware Setup

app.use(express.json());
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use(errorHandler);

// Server Start

app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});
