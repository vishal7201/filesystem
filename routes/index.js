const express = require('express');
const router = express.Router();

const directory = require('./directory');

router.use('/', directory);

module.exports = router;
