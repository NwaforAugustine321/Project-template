const Sequelize = require('sequelize');
const config = require('config');

const dataBaseConfig = config.get('dataBase');

const sequelize = new Sequelize(
  dataBaseConfig._dataName,
  dataBaseConfig.__database_userName,
  dataBaseConfig.__database_password,
  {
    host: dataBaseConfig.host,
    dialect: dataBaseConfig.dialect,
    storage: dataBaseConfig.storage,
  }
);

module.exports = sequelize;
