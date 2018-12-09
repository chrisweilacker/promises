/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {
  // TODO
  return new Promise((resolve, reject) => {
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
        resolve(returnString.slice(0, pos + index));
      })
      .on('error', (err)=> {
        reject(err);
      });
  });

};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  // TODO
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(response.statusCode);
      }
    });
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
