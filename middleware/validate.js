const validator = require('../helpers/validate');

const validateUser = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    userName: 'string',
    email: 'email',
    githubId: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).json({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const validatePainting = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    artist: 'required|string',
    price: 'required|numeric',
    type: 'required|string',
    year: 'integer',
    tags: 'array'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).json({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const validateSculpture = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    artist: 'required|string',
    price: 'required|numeric',
    material: 'required|string',
    year: 'integer',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).json({
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
  validateUser,
  validatePainting,
  validateSculpture
};
