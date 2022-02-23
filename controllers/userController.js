const {Thought, User} = require('../models');

module.exports = {
    getAllUsers(req,res) {
        res.json('get all users.');
    },
    getSingleUserByID(req,res) {
        res.json('get single user by ID.');
    },
    postNewUser(req,res) {
        res.json('post/create a new user.');
    },
    updateUserByID(req,res) {
        res.json('update user information by ID.');
    },
    deleteUserByID(req,res) {
        res.json('delete user by ID.');
    },
    addFriend(req,res) {
        res.json('add friend to user.');
    },
    removeFriend(req,res) {
        res.json('remove friend from user.');
    },
}