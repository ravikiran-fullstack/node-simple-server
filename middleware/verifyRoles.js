const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    console.log(req);
    if (!req?.roles) return res.sendStatus(401);
    console.log('allowedRoles...', allowedRoles);
    const rolesArray = allowedRoles;
    console.log('rolesArray...', rolesArray);
    console.log('req.roles...', req.roles);
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);

    if (!result) {
      return res.sendStatus(401);
    }
    next();
  };
};

module.exports = verifyRoles;
