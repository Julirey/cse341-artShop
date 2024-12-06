const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

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
      res.status(200).json(user);
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getById = async (req, res) => {
  //#swagger.tags=['User']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ message: 'Must use a valid user id to find a user' });
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('user').find({ _id: userId });
    result.toArray().then((user) => {
      res.status(200).json(user);
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  createUser,
  getAll,
  getById
};
