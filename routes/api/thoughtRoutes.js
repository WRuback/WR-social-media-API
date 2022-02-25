const router = require('express').Router();

// Import all controllers.
const { getAllThoughts,
    getSingleThoughtByID,
    postNewThought,
    updateThoughtByID,
    deleteThoughtByID,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController.js');

// Set routes for routes that need nothing.
router.route('/')
    .get(getAllThoughts)
    .post(postNewThought);

// Set routes for those that need an ID.
router.route('/:id')
    .get(getSingleThoughtByID)
    .put(updateThoughtByID)
    .delete(deleteThoughtByID);

// Set routes to interact with the friend list.
router.route('/:id/reactions')
    .post(addReaction)
    .delete(removeReaction);

module.exports = router;