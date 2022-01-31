const { DataTypes, Model, Sequelize } = require('sequelize');
const sequelize = require('../Database/config');

class User extends Model {}

User.init(
  {
    userEmail: DataTypes.STRING,
    password: DataTypes.STRING,
    userName: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'users',
  }
);

module.exports = User;
