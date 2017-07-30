const { spawn } = require("child_process");
const fs = require('fs');

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

const getContent = (dirPath) => {
  
}

module.exports = {
  getDrives,
}
