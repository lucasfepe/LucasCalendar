const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate.js');
const departmentController = require('../controllers/event.js');
const { isAuthenticated } = require('../middleware/authenticate.js')

router.get('/', departmentController.getAllDepartments);

router.get('/:id', departmentController.getSingleDepartment);
router.post('/',isAuthenticated,
    // validation.department, 
    departmentController.createDepartment);
router.put('/:id',isAuthenticated,
    // validation.department, 
    departmentController.updateDepartment);
router.delete('/:id',isAuthenticated, departmentController.deleteDepartment);

module.exports = router;
