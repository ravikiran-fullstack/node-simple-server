const data = {};

data.employees = require('../model/employees.json');

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const createNewEmployees = (req, res) => {
  const name = req.body.firstname;

  if (!name || !name[0])
    return res.status(422).send({ error: 'Name is required' });

  // const employee = data.employees.find((emp) => emp.firstname === name);
  let newEmployeeId = 1 + data.employees.length;
  //   console.log('new id', newEmployeeId);
  var newEmployeeData = Object.assign({}, req.body, {
    id: newEmployeeId,
  });
  data.employees.push(newEmployeeData);
  res.status(200).json(newEmployeeData);
};

const updateEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    res.status(400).json({ message: `Employee ID ${req.body.id} not found` });
  }
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;

  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );

  const unSortedArray = [...filteredArray, employee];
  data.employees = unSortedArray.sort((a, b) =>
    a.id > b.id ? 1 : a.id < b.id ? -1 : 0
  );

  res.json(data.employees);
};

const deleteEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    res.status(400).json({ message: `Employee ID ${req.body.id} not found` });
  }

  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );

  data.employees = filteredArray;

  res.json(data.employees);
};

const getEmployee = (req, res) => {
  const empId = parseInt(req.params.id);
  console.log(empId);
  const employee = data.employees.find((emp) => empId === emp.id);
  res.json(employee ? employee : { message: 'Valid emp id is required' });
};

module.exports = {
  getAllEmployees,
  createNewEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
