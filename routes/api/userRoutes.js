const router = require('express').Router();

// Import all controllers.
const { getAllUsers,
    getSingleUserByID,
    postNewUser,
    updateUserByID,
    deleteUserByID,
    addFriend,
    removeFriend
} = require('../../controllers/userController.js');

// Set routes for routes that need nothing.
router.route('/')
    .get(getAllUsers)
    .post(postNewUser);

// Set routes for those that need an ID.
router.route('/:id')
    .get(getSingleUserByID)
    .put(updateUserByID)
    .delete(deleteUserByID);

// Set routes to interact with the friend list.
router.route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;