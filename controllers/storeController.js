const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const createStore = async (req, res) => {
  // #swagger.tags=['Store']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: {
                name: 'any',
                itemType: 'any',
                itemId:'any',
                date: 'any'
            }
    } */
  const store = {
    name: req.body.name,
    itemType: req.body.itemType,
    itemId: req.body.itemId,
    date: req.body.date
  };

  const result = await mongodb.getDatabase().db().collection('store').insertOne(store);

  if (result.acknowledged) {
    res.status(201).json({
      id: result.insertedId
    });
  } else {
    res.status(500).json(result.error || 'Some error occurred while creating the store order');
  }
};

const getAll = async (req, res) => {
  // #swagger.tags=['Store']
  try {
    const result = await mongodb.getDatabase().db().collection('store').find();
    result.toArray().then((store) => {
      res.status(200).json(store);
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getById = async (req, res) => {
  // #swagger.tags=['Store']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ message: 'Must use a valid store id to find a store order' });
    }
    const storeId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('store')
      .find({ _id: storeId })
      .toArray();

      if(!result[0]) {
        return res.status(404).json('store order not found.');
      }
      
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getByType = async (req, res) => {
  // #swagger.tags=['Store']
  try {
    const type = req.params.type;
    const result = await mongodb.getDatabase().db().collection('store').find({ itemType: type });
    result.toArray().then((store) => {
      res.status(200).json(store);
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateStore = async (req, res) => {
  // #swagger.tags=['Store']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: {
                name: 'any',
                itemType: 'any',
                itemId:'any',
                date: 'any'
            }
    } */
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid store id to update a store order' });
  }
  const storeId = ObjectId.createFromHexString(req.params.id);
  const store = {
    name: req.body.name,
    itemType: req.body.itemType,
    itemId: req.body.itemId,
    date: req.body.date
  };

  const result = await mongodb
    .getDatabase()
    .db()
    .collection('store')
    .replaceOne({ _id: storeId }, store);

  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Some error ocurred while updating the store order');
  }
};

const deleteStore = async (req, res) => {
  // #swagger.tags=['Store']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid store id to delete a store order' });
  }
  const storeId = ObjectId.createFromHexString(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('store')
    .deleteOne({ _id: storeId });

  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Some error ocurred while deleting the store order');
  }
};

module.exports = {
  createStore,
  getAll,
  getById,
  getByType,
  updateStore,
  deleteStore
};
