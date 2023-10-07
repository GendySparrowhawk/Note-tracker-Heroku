// pulling in requirments for paths and such

const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, './db.json');
// retrive data from the database
function getData() {
  const json = fs.readFileSync(dbPath, 'utf8');

  return JSON.parse(json);
}
// write new data from the database
function writeData(notesArray) {
  fs.writeFile(dbPath, JSON.stringify(notesArray, null, 2), () => {
    console.log('DB updated successfully!');
  });
}

// export these functions to be used on server.js
module.exports = { getData, writeData }