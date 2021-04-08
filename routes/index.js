const router = require('express').Router();
const apiRoutes = require('./apiRoutes');

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.send('Wrong Route!')
});

module.exports = router;