const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('employee_db', 'root', 'Sewy1324@#', {
  host: 'localhost',
  dialect: 'mysql',
  logging: true
});

module.exports = sequelize;
