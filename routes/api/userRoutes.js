const router = require('express').Router();

const { getAllUsers,
    getSingleUserByID,
    postNewUser,
    updateUserByID,
    deleteUserByID,
    addFriend,
    removeFriend
} = require('../../controllers/userController.js');

router.route('/')
    .get(getAllUsers)
    .post(postNewUser);

router.route('/:id')
    .get(getSingleUserByID)
    .put(updateUserByID)
    .delete(deleteUserByID);

router.route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;