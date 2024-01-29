const { Sequelize } = require("sequelize");

const config =  {
    username: "YOUR_USERNAME",
    password: "YOUR_PASSWORD",
    database: "node",
    host: "localhost",
    dialect: "mysql",
  };

module.exports = sequelize = new Sequelize(config);
