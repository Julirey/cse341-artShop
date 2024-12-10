const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const createPainting = async (req, res) => {
  // #swagger.tags=['Painting']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: {
                name: 'any',
                artist: 'any',
                price: 'any',
                type: 'any',
                year: 'any',
                tags: [
                    'any'
                ]
            }
    } */
  const painting = {
    name: req.body.name,
    artist: req.body.artist,
    price: req.body.price,
    type: req.body.type,
    year: req.body.year || null,
    tags: req.body.tags || null
  };

  const result = await mongodb.getDatabase().db().collection('painting').insertOne(painting);

  if (result.acknowledged) {
    res.status(201).json({
      id: result.insertedId
    });
  } else {
    res.status(500).json(result.error || 'Some error occurred while creating the painting');
  }
};

const getAll = async (req, res) => {
  // #swagger.tags=['Painting']
  try {
    const result = await mongodb.getDatabase().db().collection('painting').find();
    result.toArray().then((painting) => {
      res.status(200).json(painting);
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getById = async (req, res) => {
  // #swagger.tags=['Painting']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ message: 'Must use a valid painting id to find a painting' });
    }
    const paintingId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('painting')
      .find({ _id: paintingId });
    result.toArray().then((painting) => {
      res.status(200).json(painting);
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getByTag = async (req, res) => {
  // #swagger.tags=['Painting']
  try {
    const tag = req.params.tag;
    const result = await mongodb.getDatabase().db().collection('painting').find({ tags: tag });
    result.toArray().then((painting) => {
      res.status(200).json(painting);
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getByArtist = async (req, res) => {
  // #swagger.tags=['Painting']
  try {
    const artist = req.params.artist;
    const result = await mongodb.getDatabase().db().collection('painting').find({ artist: artist });
    result.toArray().then((painting) => {
      res.status(200).json(painting);
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updatePainting = async (req, res) => {
  // #swagger.tags=['Painting']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: {
                name: 'any',
                artist: 'any',
                price: 'any',
                type: 'any',
                year: 'any',
                tags: [
                    'any'
                ]
            }
    } */
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid painting id to update a painting' });
  }
  const paintingId = new ObjectId(req.params.id);
  const painting = {
    name: req.body.name,
    artist: req.body.artist,
    price: req.body.price,
    type: req.body.type,
    year: req.body.year || null,
    tags: req.body.tags || null
  };

  const result = await mongodb
    .getDatabase()
    .db()
    .collection('painting')
    .replaceOne({ _id: paintingId }, painting);

  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || ' Some error ocurred while updating the painting');
  }
};

const deletePainting = async (req, res) => {
  // #swagger.tags=['Painting']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid painting id to delete a painting' });
  }
  const paintingId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('painting')
    .deleteOne({ _id: paintingId });

  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Some error ocurred while deleteing the painting');
  }
};

module.exports = {
  createPainting,
  getAll,
  getById,
  getByTag,
  getByArtist,
  updatePainting,
  deletePainting
};
