const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// Gives a default API response if an incorrect route is used.
router.use((req,res) => {
    res.status(404).json("Imporper Route.");
});

module.exports = router;