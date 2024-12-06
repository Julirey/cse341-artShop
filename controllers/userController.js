const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const findOrCreate = async (user) => {
  // #swagger.ignore = true
  const result = await mongodb.getDatabase().db().collection('user').find({ githubId: user.id });
  const resultArray = await result.toArray();
  if (resultArray.length == 0) {
    let nameArray = user.name.split(' ');
    let newUser = {
      firstName: nameArray[0],
      lastName: nameArray[1],
      userName: user.login,
      email: user.email,
      githubId: user.id
    };
    const result = await mongodb.getDatabase().db().collection('user').insertOne(newUser);

    if (!result.acknowledged) {
      throw new Error('Some error occurred while creating the user');
    }
  }
};

const createUser = async (req, res) => {
  // #swagger.tags=['User']
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    githubId: req.body.githubId
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
  // #swagger.tags=['User']
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
  // #swagger.tags=['User']
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

const updateUser = async (req, res) => {
  // #swagger.tags=['User']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid user id to update a user' });
  }
  const userId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    githubId: req.body.githubId
  };

  const result = await mongodb
    .getDatabase()
    .db()
    .collection('user')
    .replaceOne({ _id: userId }, user);

  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Some error occurred while updating the user');
  }
};

const deleteUser = async (req, res) => {
  // #swagger.tags=['User']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid user id to delete a user' });
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('user').deleteOne({ _id: userId });

  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Some error occurred while deleting the user');
  }
};

module.exports = {
  findOrCreate,
  createUser,
  getAll,
  getById,
  updateUser,
  deleteUser
};
