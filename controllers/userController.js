const { Thought, User } = require('../models');

// Each function has a try catch on it to catch any errors.
module.exports = {
    async getAllUsers(req, res) {
        try {
            // Pulls the user data from the db.
            const userData = await User.find();
            userData ? res.status(200).json(userData) : res.status(500).json("Could not find Data");
        } catch (err) {
            res.status(500).json("Could not find Data");
        }
    },

    async getSingleUserByID(req, res) {
        try {
            // Finds the one user withh the given ID, and gives it all it's thoughts and friends.
            const userData = await User.findOne({ _id: req.params.id }).populate('thoughts').populate('friends');
            userData ? res.status(200).json(userData) : res.status(500).json("Could not find Data");
        } catch (err) {
            res.status(500).json("Could not find Data");
        }
    },

    async postNewUser(req, res) {
        try {
            // Creates a new user with the given name and email.
            const newUserData = await User.create(req.body);
            newUserData ? res.status(200).json(newUserData) : res.status(500).json("Could not create user.");
        } catch (err) {
            res.status(500).json("Could not create user.");
        }
    },

    async updateUserByID(req, res) {
        try {
            // Update the user with the new information, but restricted so only the username and email can be updated.
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
            // Removes the user with the ID.
            const removedUserData = await User.findOneAndDelete({ _id: req.params.id });
            if (removedUserData) {
                // Once the user is removed, we then delete all the thoughts linked to that user.
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
            // Adds the friend ID to the user's friend list.
            const updatedUserData = await User.findOneAndUpdate(
                { _id: req.params.id },
                {
                    // Uses add to set as it prevent duplicates.
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
            // Removes the friend ID from the user's friend list.
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