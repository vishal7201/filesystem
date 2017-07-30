const express = require('express');
const router = express.Router();
const { System } = require('../app/filesystem');

router.get('/', (req, res) => {
  System.getDrives().
    then(drives => res.json({drives})).
    catch(error => res.status(500).json({"error":error}));
});

router.get('/directory', (req, res) => {
  System.getDirectoryContent(req.query.d).
    then(content => {
      res.json({content});
    }).
    catch(error => {
      console.log(error);
      res.status(500).json({error});
    });
});



module.exports = router;
