const { Thought, User } = require('../models');

// Each function has a try catch on it to catch any errors.
module.exports = {
    async getAllThoughts(req, res) {
        try {
            // Pulls the thought data from the db.
            const thoughtData = await Thought.find();
            thoughtData ? res.status(200).json(thoughtData) : res.status(500).json("Could not find thought");
        } catch (err) {
            res.status(500).json("Could not find thought");
        }
    },

    async getSingleThoughtByID(req, res) {
        try {
            // Finds the one though with the given ID.
            const thoughtData = await Thought.findOne({ _id: req.params.id });
            thoughtData ? res.status(200).json(thoughtData) : res.status(500).json("Could not find thought");
        } catch (err) {
            res.status(500).json("Could not find thought");
        }
    },

    async postNewThought(req, res) {
        try {
            // Creates the new thought from the provided data.
            const newThoughtData = await Thought.create(req.body);
            if (newThoughtData) {
                // Adds the new thought ID to the user's thoughts reference array.
                const updatedUserData = await User.findOneAndUpdate(
                    { _id: req.body.userId },
                    {
                        $addToSet: {
                            thoughts: newThoughtData._id
                        }
                    },
                    { runValidators: true, new: true });
                updatedUserData ? res.status(200).json(newThoughtData) : res.status(500).json("Created thought, but could not find user.");
            } else {
                res.status(500).json("Could not create thought");
            }
        } catch (err) {
            res.status(500).json("Could not create thought.");
        }
    },

    async updateThoughtByID(req, res) {
        try {
            // Updates the thought by ID, but limits the update to only the text.
            const updatedThoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $set: {
                        thoughtText: req.body.thoughtText
                    }
                },
                { runValidators: true, new: true });
            updatedThoughtData ? res.status(200).json(updatedThoughtData) : res.status(500).json("Could not find thought to update.");
        } catch (err) {
            res.status(500).json("Could not find thought to update.");
        }
    },

    async deleteThoughtByID(req, res) {
        try {
            // deletes the thought by ID.
            const removedRemovedData = await Thought.findOneAndDelete({ _id: req.params.id });
            removedRemovedData ? res.status(200).json("The Thought has been deleted") : res.status(500).json("Could not find thought to update.");
        } catch (err) {
            res.status(500).json("Could not find thought to update.");
        }
    },

    async addReaction(req, res) {
        try {
            // Check to see if the needed values were provided.
            const { username, reactionBody } = req.body;
            if (!username && !reactionBody) {
                throw "Improper Data";
            }
            //creates the reaction in the thought's reaction array.
            const updatedThoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $push: {
                        reactions: {
                            username: req.body.username,
                            reactionBody: req.body.reactionBody
                        }
                    }
                },
                { runValidators: true, new: true });
            updatedThoughtData ? res.status(200).json(updatedThoughtData) : res.status(500).json("Could not find user to update.");
        } catch (err) {
            res.status(500).json("Improper Information, Could Not Update.");
        }
    },

    async removeReaction(req, res) {
        try {
            // Check to see if the needed values were provided.
            const { reactionId } = req.body;
            if (!reactionId) {
                throw "Improper Data";
            }
            // Removes the reaction from the thought based on ID.
            const updatedThoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $pull: {
                        reactions: {
                            reactionId: reactionId
                        }
                    }
                },
                { runValidators: true, new: true });
            updatedThoughtData ? res.status(200).json(updatedThoughtData) : res.status(500).json("Could not find user to update.");
        } catch (err) {
            res.status(500).json("Improper Information, Could Not Update.");
        }
    },
}