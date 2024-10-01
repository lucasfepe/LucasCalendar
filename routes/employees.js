const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');
const employeeController = require('../controllers/employee');
const { isAuthenticated } = require('../middleware/authenticate')

router.get('/', employeeController.getAllEmployees);

router.get('/:id', employeeController.getSingleEmployee);
router.post('/',isAuthenticated,validation.employee, employeeController.createEmployee);
router.put('/:id',isAuthenticated,validation.employee, employeeController.updateEmployee);
router.delete('/:id', isAuthenticated,employeeController.deleteEmployee);

module.exports = router;
