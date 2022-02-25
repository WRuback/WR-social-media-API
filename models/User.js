const { Schema, model } = require('mongoose');

// Sets up the schema for the users.
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: [true, "Username Already Used"],
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: [true, "Email Already Used"],
            required: true,
            match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],

    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// Creates virtual that display the amount of friends on query calls.
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;