const { Thought, User } = require('../models');

// All User calls will be formated with Async Await
module.exports = {
    async getAllUsers(req, res) {
        try {
            const userData = await User.find();
            userData ? res.status(200).json(userData) : res.status(500).json("Could not find Data");
        } catch (err) {
            res.status(500).json("Could not find Data");
        }
    },
    async getSingleUserByID(req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.id }).populate('thoughts').populate('friends');
            userData ? res.status(200).json(userData) : res.status(500).json("Could not find Data");
        } catch (err) {
            res.status(500).json("Could not find Data");
        }
    },
    async postNewUser(req, res) {
        try {
            const newUserData = await User.create(req.body);
            newUserData ? res.status(200).json(newUserData) : res.status(500).json("Could not create user.");
        } catch (err) {
            res.status(500).json("Could not create user.");
        }
        // User.create(req.body)
        // .then((newUser) => {
        //     res.status(200).json(newUser);
        // })
        // .catch((err) => res.status(500).json("Could not create user."));
    },
    async updateUserByID(req, res) {
        try {
            const updatedUserData = await User.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $set: {
                        username: req.body.username,
                        email: req.body.email
                    }
                },
                { runValidators: true, new: true });
            updatedUserData ? res.status(200).json(updatedUserData) : res.status(500).json("Could not find user to update.");
        } catch (err) {
            res.status(500).json("Could not find user to update.");
        }
    },
    async deleteUserByID(req, res) {
        try {
            const removedUserData = await User.findOneAndDelete({ _id: req.params.id });
            if (removedUserData) {
                await Thought.deleteMany({ _id: { $in: removedUserData.thoughts } });
                res.status(200).json("The User and their thoughts have been deleted");
            } else {
                res.status(500).json("Could not find user to update.");
            }
        } catch (err) {
            res.status(500).json("Could not find user to update.");
        }
    },
    async addFriend(req, res) {
        try {
            const updatedUserData = await User.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $addToSet: {
                        friends: req.params.friendId
                    }
                },
                { runValidators: true, new: true });
            updatedUserData ? res.status(200).json(updatedUserData) : res.status(500).json("Could not find user to update.");
        } catch (err) {
            res.status(500).json("Could not find user to update.");
        }
    },
    async removeFriend(req, res) {
        try {
            const updatedUserData = await User.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    $pull: {
                        friends: req.params.friendId
                    }
                },
                { runValidators: true, new: true });
            updatedUserData ? res.status(200).json(updatedUserData) : res.status(500).json("Could not find user to update.");
        } catch (err) {
            res.status(500).json("Could not find user to update.");
        }
    },
}