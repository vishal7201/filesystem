const express = require('express');
const router = express.Router();
const { System } = require('../app/filesystem');

router.get('/', (req, res) => {
  System.getDrives().
    then(drives => res.json({drives})).
    catch(error => res.status(500).json({"error":error}));
});

module.exports = router;
