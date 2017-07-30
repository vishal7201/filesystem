const util = require('util');
const fs = require('fs');
const readdir = util.promisify(fs.readdir);

readdir('d:/').
  then(data => {
    console.log(data);
  }).
  catch(err => {
    console.log(err);
  });
