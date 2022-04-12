
const MM = require('music-metadata');
const ObjectId = require('mongodb').ObjectId;
const { resolve } = require('path');
const { readdir } = require('fs').promises;

// used to get downloaded mp3 for post/songs
async function getFiles(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return Array.prototype.concat(...files);
  }

  //get song metadata
  function getMetadata(song){
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          var metadata = await MM.parseFile(song);
          resolve(metadata);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  // used to check if audio file is valid when using get/mp3
  async function getFileStat(id, bucket, callback) {
    var documents = await bucket.find({"_id" : ObjectId(id)}).toArray();
    if(documents.length > 0) return callback(null, documents[0]);
    else return callback("empty", null);
  }
  

  module.exports = {
    getFiles,
    getMetadata,
    getFileStat
  }