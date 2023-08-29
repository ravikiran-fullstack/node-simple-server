const express = require('express');
const router = express.Router();
const path = require('path');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

const {
  getAllEmployees,
  createNewEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployee,
} = require('../../controllers/employeesController');

const verifyJWT = require('../../middleware/verifyJWT');
console.log('ROLES_LIST.Admin...', ROLES_LIST.Admin);
router
  .route('/')
  .get(
    verifyJWT,
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User),
    getAllEmployees
  )
  .post(
    verifyJWT,
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    createNewEmployees
  )
  .put(
    verifyJWT,
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    updateEmployee
  )
  .delete(verifyJWT, verifyRoles(ROLES_LIST.Admin), deleteEmployee);

router.route('/:id').get(getEmployee);

module.exports = router;
