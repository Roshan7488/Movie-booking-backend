const {errorResponseBody}=require('../utils/responsebody');
const {STATUS}=require('../utils/constants');
const ObjectId=require('mongoose').Types.ObjectId;

const verifyPaymentCreateRequest = async(req,res,next)=>{
  if(!req.body.bookingId){
    errorResponseBody.err='NO booking id received id';
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }
  if(!req.body.amount){
    errorResponseBody.err='No amount sent';
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }
  next();
}

module.exports={
  verifyPaymentCreateRequest
}