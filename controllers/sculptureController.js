const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const createSculpture = async (req, res) => {
  // #swagger.tags=['Sculpture']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: {
                name: 'any',
                artist: 'any',
                price: 'any',
                material: 'any',
                year: 'any'
            }
    } */
  const sculpture = {
    name: req.body.name,
    artist: req.body.artist,
    price: req.body.price,
    material: req.body.material,
    year: req.body.year || null
  };

  const result = await mongodb.getDatabase().db().collection('sculpture').insertOne(sculpture);

  if (result.acknowledged) {
    res.status(201).json({
      id: result.insertedId
    });
  } else {
    res.status(500).json(result.error || 'Some error occurred while creating the sculpture');
  }
};

const getAll = async (req, res) => {
  // #swagger.tags=['Sculpture']
  try {
    const result = await mongodb.getDatabase().db().collection('sculpture').find();
    result.toArray().then((sculpture) => {
      res.status(200).json(sculpture);
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getById = async (req, res) => {
  // #swagger.tags=['Sculpture']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ message: 'Must use a valid sculpture id to find a sculpture' });
    }
    const sculptureId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('sculpture')
      .find({ _id: sculptureId })
      .toArray();

      if(!result[0]) {
        return res.status(404).json('sculpture not found.');
      }
      
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getByArtist = async (req, res) => {
  // #swagger.tags=['Sculpture']
  try {
    const artist = req.params.artist;
    const result = await mongodb.getDatabase().db().collection('sculpture').find({ artist: artist });
    result.toArray().then((sculpture) => {
      res.status(200).json(sculpture);
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getByMaterial = async (req, res) => {
    // #swagger.tags=['Sculpture']
    try {
      const material = req.params.material;
      const result = await mongodb.getDatabase().db().collection('sculpture').find({ material: material });
      result.toArray().then((sculpture) => {
        res.status(200).json(sculpture);
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

const updateSculpture = async (req, res) => {
  // #swagger.tags=['Sculpture']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: {
                name: 'any',
                artist: 'any',
                price: 'any',
                material: 'any',
                year: 'any'
            }
    } */
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid sculpture id to update a sculpture' });
  }
  const sculptureId = ObjectId.createFromHexString(req.params.id);
  const sculpture = {
    name: req.body.name,
    artist: req.body.artist,
    price: req.body.price,
    material: req.body.material,
    year: req.body.year || null
  };

  const result = await mongodb
    .getDatabase()
    .db()
    .collection('sculpture')
    .replaceOne({ _id: sculptureId }, sculpture);

  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Some error ocurred while updating the sculpture');
  }
};

const deleteSculpture = async (req, res) => {
  // #swagger.tags=['Sculpture']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid sculpture id to delete a sculpture' });
  }
  const sculptureId = ObjectId.createFromHexString(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('sculpture')
    .deleteOne({ _id: sculptureId });

  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Some error ocurred while deleting the sculpture');
  }
};

module.exports = {
  createSculpture,
  getAll,
  getById,
  getByArtist,
  getByMaterial,
  updateSculpture,
  deleteSculpture
};
