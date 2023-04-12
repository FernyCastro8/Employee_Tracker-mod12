const { Sequelize } = require('sequelize');

const connection = new Sequelize(
  process.env.DATABASE,
  process.env.USERNAME,
  process.env.PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = connection;