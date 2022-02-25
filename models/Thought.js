const { Schema, Types, model } = require('mongoose');

// Used to format our date calls into a readable format.
function formatDate(time) {
    return new Date(time).toLocaleString();
}

// Creates a reaction schema to be used within the Thought Schema.
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            // Uses a anonymous function, so every instance creates a new ID.
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Uses the formatDate function to change the data display when acquired.
            get: formatDate
        }
    },
    {
        toJSON: {
            getters: true
        }, 
        // This stops the schema from making it's own ID.
        _id: false
    }
)

// Sets up the schema for the thought data.
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Uses the formatDate function to change the data display when acquired.
            get: formatDate
        },
        username: {
            type: String,
            required: true
        },
        // Set the reaction schema as an object.
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

// Creates a virtual to display the amount of reactions on query calls..
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Creates the model.
const Thought = model('thought', thoughtSchema);

module.exports = Thought;