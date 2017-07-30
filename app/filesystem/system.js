const { spawn } = require("child_process");
const fs = require('fs');
const util = require('util');

const getDrives = () => {
  const list = spawn('cmd');
  return new Promise((resolve, reject) => {
    list.stdout.on('data', (data) => {
      const out = data.toString();
      let output = out.split('\r\n').map(e => e.trim()).filter(e => e!="");
      if(output[0] == 'Name'){
        resolve(output.splice(1))
      }
    });
    list.stderr.on('data', (data) => {
      reject(data);
    });
    list.stdin.write('wmic logicaldisk get name\n');
    list.stdin.end();
  });
}

const getDirectoryContent = (dirPath) => {
  const readdir = util.promisify(fs.readdir);
  const stat = util.promisify(fs.stat);
  return new Promise((resolve, reject) => {
    readdir(dirPath).
    then(items => items).
    then(items => {
      let getItemsStats = [];
      console.log(items);
      for (item of items){
        getItemsStats.push((stat(`${dirPath}/${item}`)));
      }
      return Promise.all(getItemsStats);
    }).
    then(itemStats => {
      resolve(itemStats);
    }).
    catch(error => {
      console.log(error);
      reject(error);
    });
  });
}

module.exports = {
  getDrives,
  getDirectoryContent
}
