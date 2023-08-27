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

const verifyJWT = require('../../middleware/verifyJWT');

router
  .route('/')
  .get(verifyJWT, getAllEmployees)
  .post(createNewEmployees)
  .put(updateEmployee)
  .delete(deleteEmployee);

router.route('/:id').get(getEmployee);

module.exports = router;
