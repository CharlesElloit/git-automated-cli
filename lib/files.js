const fs = require("fs");
const path = require("path");

module.exports = {
  getCurrentRootDirectory: function() {
    return path.basename(process.cwd());
  },

  isDirectoryExists: function(folderPath) {
    return fs.existsSync(folderPath);
  }
};

// const filesHandler = (function() {
//   return {
//     getCurrentRootDirectory: function() {
//       return path.basename(process.cwd());
//     },

//     isDirectoryExists: function(folderPath) {
//       return fs.existsSync(folderPath);
//     }
//   };
// })();

// module.exports = { filesHandler };
