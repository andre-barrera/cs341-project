const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //Swagger.tags=['Users']
    const result = await mongodb.getDatabase().db('sample_mflix').collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    })
};

const getSingle = async (req, res) => {
    //Swagger.tags=['Users']
    const userId = new objectId(req.params.id);
    const result = await mongodb.getDatabase().db('sample_mflix').collection('users').find({ _id: userId });
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    })
};

const createUser = async (req, res) => {
    //Swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
    };
    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the user.0');
    }
};

const updateUser = async (req, res) => {
    //Swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
    };
    const response = await mongodb.getDatabase().db().collection('users').replaceOne({_id: userId}, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the user.0');
    }
};

const deleteUser = async (req, res) => {
    //Swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({_id: userId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the user.0');
    }
};


module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
}