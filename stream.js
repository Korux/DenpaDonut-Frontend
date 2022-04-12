const {getFileStat} = require("./utils");
const fs = require('fs');
const ObjectId = require('mongodb').ObjectId;
const Mongo = require('mongodb');
const { Readable } = require('stream');

// --- Used for get/mp3 ---

// Streaming whole file
function streamFile(id, bucket, req, res) {
    getFileStat(id, bucket, function(err, stat) {
      if(err) {
        console.error(err);
        return res.status(404).end();
      }
      
      res.writeHead(200, {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.length
      });
      let stream = bucket.openDownloadStream(new ObjectId(req.params.id));
      stream.pipe(res);
    });
  }
  
  // Streaming chunk
  function streamFileChunked(id, bucket, req, res) {
    getFileStat(id, bucket, function(err, stat) {
      if(err) {
        console.error(err);
        return res.status(404).end();
      }
      
      let range = (req.headers.range) ? req.headers.range.replace(/bytes=/, "").split("-") : [];
      let chunkSize = stat.chunkSize * 5;
      while (chunkSize < stat.length / 3)
        chunkSize += stat.chunkSize;
      
      range[0] = range[0] ? parseInt(range[0], 10) : 0;
      range[1] = range[1] ? parseInt(range[1], 10) : range[0] + chunkSize;
      if(range[1] > stat.length - 1) {
        range[1] = stat.length - 1;
      }
      var contentSize = (range[1] - range[0]) + 1;
      
      range = {start: range[0], end: range[1] + 1};
  
      let stream = bucket.openDownloadStream(new ObjectId(req.params.id), range);
      res.writeHead(206, {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Content-Type': 'audio/mpeg',
        'Accept-Ranges': 'bytes',
        'Content-Range': 'bytes ' + range.start + '-' + (range.end - 1) + '/' + stat.length,
        'Content-Length': contentSize,
      });
  
      stream.on('data', (chunk) => {
        res.write(chunk);
      });
  
      stream.on('error', () => {
        res.sendStatus(404);
      });
  
      stream.on('end', () => {
        res.end();
        
       });
    });
  }
  

  // --- used for post/songs ---

  
function streamSongToDB(song, name, dbmp3){
    return new Promise((resolve, reject) => {
      let readStream = fs.createReadStream(song);
  
      let bucket = new Mongo.GridFSBucket(dbmp3, {
        bucketName: 'audio'
      });
  
      let uploadStream = bucket.openUploadStream(name);
      let id = uploadStream.id;
      readStream.pipe(uploadStream);
  
      uploadStream.on('error', err => {
        reject(err);
      });
  
      uploadStream.on('finish', () => {
        resolve(id);
      });
    });
  }
  
  function submitToSongs(metadata, duration, url, songid, picid, userid, songs){
    let data = {
      album : metadata.album ? metadata.album : '-',
      artist : metadata.artist ? metadata.artist : '-',
      tags : metadata.artists ? metadata.artists : [],
      title : metadata.title ? metadata.title : '-',
      year : metadata.year ? metadata.year : '-',
      url : url,
      duration : duration,
      songid : songid,
      picid : picid,
      userid : userid
    }
    return songs.insertOne(data);
  }
  
  // pic is a file of the picture, name is a string used for the database item
  
  function streamPicFileToDB(pic, name, dbpic){
    return new Promise((resolve, reject) => {
      let readStream = fs.createReadStream(pic);
  
      let bucket = new Mongo.GridFSBucket(dbpic, {
        bucketName: 'pictures'
      });
  
      let uploadStream = bucket.openUploadStream(name);
      let id = uploadStream.id;
      readStream.pipe(uploadStream);
  
      uploadStream.on('error', err => {
        reject(err);
      });
  
      uploadStream.on('finish', () => {
        resolve(id);
      });
    });
  }
  
  // pic is a buffer of the picture, name is a string used for the database item
  
  function streamPicToDB(pic, name, dbpic){
    return new Promise((resolve, reject) => {
      const readablePhotoStream = new Readable();
      readablePhotoStream.push(pic);
      readablePhotoStream.push(null);
  
      let bucket = new Mongo.GridFSBucket(dbpic, {
        bucketName: 'pictures'
      });
  
      let uploadStream = bucket.openUploadStream(name);
      let id = uploadStream.id;
      readablePhotoStream.pipe(uploadStream);
  
      uploadStream.on('error', err => {
        reject(err);
      });
  
      uploadStream.on('finish', () => {
        resolve(id);
      });
    });
  }

  module.exports = {
      streamFile,
      streamFileChunked,
      streamPicFileToDB,
      streamPicToDB,
      streamSongToDB,
      submitToSongs
  }