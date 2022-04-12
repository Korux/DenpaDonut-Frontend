
//--------------------------------------------------------

const { exec } = require("child_process");
const cors = require('cors');
const fs = require('fs');
const session = require('express-session');
const path = require('path');

const {verifyToken, googleAuthVerifyToken} = require('./auth');
const {getFiles, getMetadata} = require('./utils');
const {streamFile, streamFileChunked,streamPicFileToDB, streamPicToDB, streamSongToDB,submitToSongs} = require('./stream');

const appURL = 'https://denpadonut.herokuapp.com';
const secret = "nanithefuckdidyoujustsaytomeyoulittleshit";

const ObjectId = require('mongodb').ObjectId;

const Mongo = require('mongodb');

require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const cookieParser = require("cookie-parser");

app.use(
  cors(
  {
    origin: appURL, 
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type', 'Authorization']
  }
  ));
app.use(express.json());
app.use(cookieParser(secret));

app.all('*', function(req, res, next) {

  res.setHeader("Access-Control-Allow-Origin", appURL);
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.set('trust proxy', 1);

app.use(session({
  name: "denpadonut_session",
  secret: secret,
  resave: false,
  saveUninitialized: true,
  proxy : true,
  cookie: {
      path: "/",
      sameSite : 'none',
      secure: true,
      httpOnly: true,
      maxAge : 1000 * 60 * 60 * 24, // one day
  }
}));

const youtubedl = require('youtube-dl-exec');

const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');


//--------------------------------------------------------

var db;
var songs;
var dbmp3;
var dbpic;

Mongo.MongoClient.connect(process.env.DBSTR, {useUnifiedTopology : true}, (err, client) => {
  if (err) return console.error(err);
  console.log('Connected to Database');
  db = client.db('denpadonut-db');
  dbmp3 = client.db('denpadonut-mp3');
  dbpic = client.db('denpadonut-pics');
  songs = db.collection('songs');
});

var storage = new GridFsStorage({
  url : process.env.DBPICSTR,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
      if(!ObjectId.isValid(req.params.id)){
          return null;
      }else{
          return {
              bucketName: "pictures",
              filename : req.params.id
          };
      }
  }
});
var upload = multer({storage : storage}).single("file");

//--------------------------------------------------------

app.post('/songs', verifyToken, googleAuthVerifyToken,(req,res) => {

  let type;
  let url = req.body.url;
  let validurl;
  if(url.includes('youtube')){
    if(url.includes("&"))url = url.split('&')[0];
    validurl = true;
    type = 'youtube';
  }else if(url.includes('spotify.com/track')){
    if(url.includes('?'))url = url.split('?')[0];
    validurl = true;
    type = 'spotify';
  }else{
    validurl = false;
  }

  if(validurl){
    songs.find( {url : url }).toArray()
    .then(results => {
      if(results.length !== 0){
        res.status(403).send({"Error" : "Song already in database."});
      }else{
        if(type === "spotify"){
          if(fs.existsSync('./out'))fs.rmdirSync('./out', {recursive : true});
          exec("spotifydl -o ./out " + url, (error) => {
              if(!error){
                getFiles('./out').then(files => {
                  getMetadata(files[1])
                  .then(data => {
                    var SongStream = streamSongToDB(files[1], data.common.title, dbmp3);
                    var PicStream = streamPicToDB(data.common.picture[0].data, data.common.title, dbpic);
                    Promise.all([SongStream, PicStream])
                    .then((ids) => {
                      submitToSongs(data.common, data.format.duration, url, ids[0], ids[1], req.payload.sub, songs)
                      .then((results) => {
                        res
                        .status(201)
                        .send({"id" : results.insertedId});
                      });
                    })
                    .catch(err => {
                      console.log(err);
                      res
                      .status(400)
                      .send({"Error" : "Error with saving song to database, please try again later."});
                    });
                  })
                  .catch(err => {
                    console.log(err);
                    res
                    .status(400)
                    .send({"Error" : "Error with getting song metadata, please try again later."});
                  });
                });
              }else{
                res
                .status(400)
                .send({"Error" : "Error with downloading song, please try again later."});
              }
          });
        }
        else if(type === "youtube"){

          if(fs.existsSync('./out.mp3'))fs.unlinkSync('./out.mp3');
          let opts = {
            extractAudio : true,
            audioFormat : 'mp3',
            output : 'out.%(ext)s',
            addMetadata : true,
          }

          youtubedl(url, opts)
          .then(() => {
            let metadataPromise = getMetadata('./out.mp3');
            let picPromise = streamPicFileToDB('./default.png', 'default', dbpic);
            let songPromise = streamSongToDB('./out.mp3', '-', dbmp3);
            Promise.all([songPromise, picPromise, metadataPromise])
            .then((ids) => {
              submitToSongs(ids[2].common, ids[2].format.duration, url, ids[0], ids[1], req.payload.sub, songs)
              .then(result => {
                res
                .status(201)
                .send({"id" : result.insertedId});
              });
            })
            .catch(err => {
              console.log(err);
              res
              .status(400)
              .send({"Error" : "Error with saving song to database, please try again later."});
            });
          })
          .catch( err => {
            console.log(err);
            res
            .status(400)
            .send({"Error" : "Error with downloading song, please try again later."});
          });
        }else{
          res
          .status(400)
          .send({"Error" : "Song source not recognized (must be youtube or spotify)."});
        }
      }
    });
  }else{
    res.status(400).send({"Error" : "URL is not a youtube or spotify track."});
  }

});

//--------------------------------------------------------

app.patch('/songs/:id', verifyToken, googleAuthVerifyToken, (req, res) => {
  if(!ObjectId.isValid(req.params.id)){
    res.status(404).send({"Error" : "This song does not exist"});
  }else{
    songs.findOne(ObjectId(req.params.id)).then(results => {
      if(!results) res.status(404).send({"Error" : "This song does not exist"});
      else if(results.userid !== req.payload.sub) res.status(403).send({"Error" : "You do not have permission to edit this song."});
      else{
        songs.updateOne(
          { _id : ObjectId(req.params.id) },
          {
            $set : {
              album : req.body.album,
              artist : req.body.artist,
              tags : req.body.tags,
              title : req.body.title,
              year : req.body.year
            }
          }
        )
        .then(() => {
            res
            .status(200)
            .send({"id" : req.params.id});
        })
        .catch(err => {
          console.error(err);
          res.status(400).send({"Error" : "Unknown Error, try again later"});
        });
      }
    }).catch(err => {
      console.error(err);
      res.status(404).send({"Error" : "Could not find song with this ID."});
    });
  }
});

//--------------------------------------------------------

app.patch('/songs/:id/pic', verifyToken, googleAuthVerifyToken, upload, (req,res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(404).send({"Error" : "This song does not exist"});
    }else{
        songs.findOne(ObjectId(req.params.id)).then(results => {
            if(!results) res.status(404).send({"Error" : "This song does not exist"});
            else if(results.userid !== req.payload.sub) res.status(403).send({"Error" : "You do not have permission to edit this song."});
            else{
              // delete previous image
              let pid = ObjectId(results.picid);
              let bucketPic = new Mongo.GridFSBucket(dbpic, {
                bucketName: 'pictures'
              });

              bucketPic.delete(pid,() => {
                songs.updateOne(
                  { _id : ObjectId(req.params.id) },
                  {
                    $set : {
                      picid : req.file.id
                    }
                  }
                )
                .then(() => {
                    res
                    .status(200)
                    .send({"picid" : req.file.id});
                })
                .catch(err => {
                  console.error(err);
                  res.status(400).send({"Error" : "Unknown Error, try again later"});
                });
              }); 
            }
        });
    }
});

//--------------------------------------------------------

app.get('/mp3/:id', verifyToken, googleAuthVerifyToken, (req, res) => {
  if(!ObjectId.isValid(req.params.id)){
    res.status(404).send({"Error" : "This mp3 does not exist"});
  }else{
    songs.findOne({songid : ObjectId(req.params.id)}).then(results => {
      if(!results) res.status(404).send({"Error" : "This song does not exist"});
      else if(results.userid !== req.payload.sub) res.status(403).send({"Error" : "You do not have permission to access this mp3."});
      else{
        let bucket = new Mongo.GridFSBucket(dbmp3, {
          bucketName : "audio"
        });
        if(!req.headers.range) 
          return streamFile(req.params.id, bucket, req, res);
        else
          streamFileChunked(req.params.id, bucket, req, res);
      }
    });

  }
});

//--------------------------------------------------------

app.get('/pic/:id', verifyToken, googleAuthVerifyToken, (req,res) => {
  if(!ObjectId.isValid(req.params.id)){
    res.status(404).send({"Error" : "This picture does not exist"});
  }else{
    songs.findOne({picid : ObjectId(req.params.id)}).then(results => {
      if(!results) res.status(404).send({"Error" : "This picture does not exist"});
      else if(results.userid !== req.payload.sub) res.status(403).send({"Error" : "You do not have permission to access this image."});
      else{
        let bucket = new Mongo.GridFSBucket(dbpic, {
          bucketName : "pictures"
        });
    
        let downloadStream = bucket.openDownloadStream(new ObjectId(req.params.id));
        downloadStream.on('data', (chunk) => {
          res.write(chunk);
        });
    
        downloadStream.on('error', () => {
          res.sendStatus(404);
        });
    
        downloadStream.on('end', () => {
          res.end();
        });
      }
    });
  }
});

//--------------------------------------------------------

app.get('/songs/:id', verifyToken, googleAuthVerifyToken, (req, res) => {
  if(!ObjectId.isValid(req.params.id)){
    res.status(404).send({"Error" : "This song does not exist"});
  }else{
      songs.findOne(ObjectId(req.params.id))
      .then(results => {
          if(!results) res.status(404).send({"Error" : "This song does not exist"});
          else if (results.userid !== req.payload.sub) res.status(403).send({"Error" : "You do not have permission to access this song."});
          else res.status(200).send(results);
      })
      .catch(err => {
          console.error(err);
          res.status(400).send({"Error" : "Unknown Error, try again later"});
      });
  }
});

//--------------------------------------------------------


app.get('/songs', verifyToken, googleAuthVerifyToken, (req,res) => {

  let search = req.query.search;

  if(search != null){
      songs.find(
        { $or: [
          { title: {$regex : search, $options : 'i'} },
          { artist: {$regex : search, $options : 'i'} },
          { album: {$regex : search, $options : 'i'} },
          { tags: {$regex : search, $options : 'i'} }
        ] }
      )
      .toArray()
      .then(results => {
          res.status(200).send(results.filter( result => result.userid === req.payload.sub));
      })
      .catch(err => {
          console.error(err);
          res.status(400).send({"Error" : "Unknown Error, try again later"});
      });

  }else{
      songs.find().toArray()
      .then(results => {
          res.status(200).send(results.filter( result => result.userid === req.payload.sub));
      })
      .catch(err => {
          console.error(err);
          res.status(400).send({"Error" : "Unknown Error, try again later"});
      });
  }
});

//--------------------------------------------------------

app.delete('/songs/:id', verifyToken, googleAuthVerifyToken, (req,res) => {
  if(!ObjectId.isValid(req.params.id)){
    res.status(404).send({"Error" : "This song does not exist"});
  }else{
      songs.findOne(ObjectId(req.params.id))
      .then(results => {
          if(!results) res.status(404).send({"Error" : "This song does not exist"});
          else if (results.userid !== req.payload.sub) res.status(403).send({"Error" : "You do not have permission to delete this song."});
          else{

            let MP3ID = results.songid;
            let PicID = results.picid;

            let bucketMP3 = new Mongo.GridFSBucket(dbmp3, {
              bucketName: 'audio'
            });
            let bucketPic = new Mongo.GridFSBucket(dbpic, {
              bucketName: 'pictures'
            });

            let mp3Promise = new Promise((resolve, reject) => {
              bucketMP3.delete(MP3ID,(err,result) => {
                if(err) reject(err);
                else resolve(result);
              });
            });
            let picPromise = new Promise((resolve, reject) => {
              bucketPic.delete(PicID,(err,result) => {
                if(err) reject(err);
                else resolve(result);
              });
            });

            let songPromise = songs.deleteOne( {_id : ObjectId(req.params.id)} );

            Promise.all([mp3Promise, picPromise, songPromise]).then(() => {
              res.sendStatus(204);
            })
            .catch(err => {
              console.log(err);
              res.status(400).send({"Error" : "Unknown Error, try again later"});
            });
          }
      })
      .catch(err => {
          console.error(err);
          res.status(400).send({"Error" : "Unknown Error, try again later"});
      });
  }
});

//--------------------------------------------

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, './frontend/build')));
// Anything that doesn't match the above, send back index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/build','index.html'));
});


app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
