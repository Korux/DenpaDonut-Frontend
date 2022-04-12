const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENTID);
require('dotenv').config();

function verifyToken(req,res,next){
  console.log(req.cookies);
    const bearerHeader = req.headers['authorization']?.split(' ')[1] || req.cookies?.usertoken;
    if(typeof bearerHeader !== 'undefined'){
      req.token = bearerHeader;
      next();
    }else{
      res.status(403).send({"Error" : "No ID token provided."});
    }
  }
  
  const googleAuthVerifyToken = async (req,res,next) => {
    try{
      const ticket = await client.verifyIdToken({
        idToken : req.token,
        audience : process.env.CLIENTID,
      });
      const payload = ticket.getPayload();
      req.payload = payload;
      next();
    }catch(err){
      res.status(403).send({"Error" : "Invalid credentials."});
    }
  }

  module.exports = {
      verifyToken,
      googleAuthVerifyToken
  }
  