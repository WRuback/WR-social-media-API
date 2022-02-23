const router = require('express').Router();

const { getAllThoughts,
    getSingleThoughtByID,
    postNewThought,
    updateThoughtByID,
    deleteThoughtByID,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController.js');

router.route('/')
    .get(getAllThoughts)
    .post(postNewThought);

router.route('/:id')
    .get(getSingleThoughtByID)
    .put(updateThoughtByID)
    .delete(deleteThoughtByID);

router.route('/:id/reactions')
    .post(addReaction)
    .delete(removeReaction);

module.exports = router;