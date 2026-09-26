const {errorResponseBody} = require('../utils/responsebody');

const validateSignupRequest = async (req,res,next)=>{
  if(!req.body.name){
    errorResponseBody.err="Name of the user not present in the request";
    return res.status(400).json(errorResponseBody);
  }
  if(!req.body.email){
    errorResponseBody.err="Email of the user not present in the request";
    return res.status(400).json(errorResponseBody);
  }
  if(!req.body.password){
    errorResponseBody.err="password of the user not present in the request";
    return res.status(400).json(errorResponseBody);
  }
   next();
}
module.exports={
  validateSignupRequest
}
