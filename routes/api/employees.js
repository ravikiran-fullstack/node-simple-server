const express = require('express');
const router = express.Router();
const path = require('path');
const {
  getAllEmployees,
  createNewEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployee,
} = require('../../controllers/employeesController');
router
  .route('/')
  .get(getAllEmployees)
  .post(createNewEmployees)
  .put(updateEmployee)
  .delete(deleteEmployee);

router.route('/:id').get(getEmployee);

module.exports = router;
