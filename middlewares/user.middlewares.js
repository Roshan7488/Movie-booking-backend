const {errorResponseBody} =require('../utils/responsebody');

const validateUpdateUserRequest=(req,res,next)=>{
  if(!(req.body.userRole || req.body.userStatus)){
    errorResponseBody.err='Malformed request, Please send atleast one parameter';
    return res.status(400).json(errorResponseBody);
  }
  next();
}

module.exports={
  validateUpdateUserRequest
}