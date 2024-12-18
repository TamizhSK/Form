const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Employee = db.define('Employee', {
  name: { type: DataTypes.STRING, allowNull: false },
  employeeId: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phone: { type: DataTypes.STRING(10), allowNull: false },
  department: { type: DataTypes.STRING, allowNull: false },
  dateOfJoining: { type: DataTypes.DATEONLY, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Employee;
