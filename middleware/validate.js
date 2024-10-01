const validator = require('../helpers/validate');

const employee = (req, res, next) => {
  const validationRule = {
    "first name": 'required|string',
    "last name": 'required|string',
    email: 'required|email',
    gender: 'required|string',
    birthday: 'string',
    address: 'string',
    phone: 'string'
  };
 

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const department = (req, res, next) => {
  let passValidation = true;
  const validationRule = {
    Name: 'required|string',
    employeeIds: 'array'
  }

  req.body.employeeIds.map(id => {
    passValidation = (typeof id === 'string' || myVar instanceof String) ?
      true : false;
  });
 


  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};



module.exports = {
  employee,
  department
};
