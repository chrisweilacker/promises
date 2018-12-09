/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callBack) {
  // TODO
  var stream = fs.createReadStream(filePath, {encoding: 'utf8'});
  var returnString = '';
  var pos = 0;
  var index;
  stream.on('data', (chunk) => {
    index = chunk.indexOf('\n');
    returnString += chunk;
    index !== -1 ? stream.close() : pos += chunk.length;
  })
    .on('close', () => {
      callBack(null, returnString.slice(0, pos + index));
    })
    .on('error', (err)=> {
      callBack(err);
    });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callBack) {
  // TODO
  request(url, (error, response, body) => {
    if (error) {
      callBack(error);
    } else {
      callBack(null, response.statusCode);
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
