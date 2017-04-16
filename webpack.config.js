var path = require('path');

module.exports = {
  entry: './weather-app/src/index.js',
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: 'index.js'
  }
};
