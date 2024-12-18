const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Add Employee
router.post('/add', async (req, res) => {
  try {
    const { name, employeeId, email, phone, department, dateOfJoining, role } = req.body;

    const newEmployee = await Employee.create({
      name,
      employeeId,
      email,
      phone,
      department,
      dateOfJoining,
      role,
    });

    res.status(201).json({ message: 'Employee added successfully', newEmployee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Employees
router.get('/list', async (req, res) => {
  const employees = await Employee.findAll();
  res.json(employees);
});

module.exports = router;
