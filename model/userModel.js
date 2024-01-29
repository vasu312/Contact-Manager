const { hashSync } = require("bcrypt");
const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

module.exports = () => {
  const User = sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.STRING(30),
        unique: true,
        allowNull: false,
        primaryKey: true,

      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          const hashedPassword = hashSync(value, 10);
          this.setDataValue("password", hashedPassword);
        },
      },
    },
    { timestamps: false, freezeTableName: true }
  );
  return User;
};
