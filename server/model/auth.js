const Sequelize = require("sequelize");
const { sequelizeConnection } = require("../connection/sequelize");

const AuthModel = sequelizeConnection.define(
  "auth",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      enum: ["USER", "ADMIN"],
      default: "USER",
      allowNull: false
    }
  },
  {
    underscored: true,
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = {
  AuthModel
};
