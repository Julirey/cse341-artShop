const mongodb = require('../data/database');

const createUser = async (req, res) => {
  //#swagger.tags=['User']
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email
  };

  const result = await mongodb.getDatabase().db().collection('user').insertOne(user);

  if (result.acknowledged) {
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({
      id: result.insertedId
    });
  } else {
    res.status(500).json(result.error || 'Some error occurred while creating the user');
  }
};

const getAll = async (req, res) => {
  //#swagger.tags=['User']
  try {
    const result = await mongodb.getDatabase().db().collection('user').find();
    result.toArray().then((user) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(user);
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  createUser,
  getAll
};
