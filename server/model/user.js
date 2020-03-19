const Sequelize = require("sequelize");
const { sequelizeConnection } = require("../connection/sequelize");

const UserModel = sequelizeConnection.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    mobile_number: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    bank_account: {
      type: Sequelize.STRING,
      allowNull: false
    },
    bank_account_number: {
      type: Sequelize.STRING,
      allowNull: false
    },
    line_id: {
      type: Sequelize.STRING,
      allowNull: false
    },
    reference: {
      type: Sequelize.STRING,
      allowNull: true
    }
  },
  {
    underscored: true,
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = {
  UserModel
};
