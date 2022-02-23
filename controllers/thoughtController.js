const {Thought, User} = require('../models');

module.exports = {
    getAllThoughts(req,res) {
        res.json('get all thoughts.');
    },
    getSingleThoughtByID(req,res) {
        res.json('get single thought by ID.');
    },
    postNewThought(req,res) {
        res.json('post/create a new thought.');
    },
    updateThoughtByID(req,res) {
        res.json('update thought information by ID.');
    },
    deleteThoughtByID(req,res) {
        res.json('delete thought by ID.');
    },
    addReaction(req,res) {
        res.json('add reaction to thought.');
    },
    removeReaction(req,res) {
        res.json('remove reaction from thought.');
    },
}