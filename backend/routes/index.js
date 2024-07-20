const express = require('express');

const router = express.Router({ mergeParams: true });

router.use('/tests', require('./test'));

module.exports = router;
