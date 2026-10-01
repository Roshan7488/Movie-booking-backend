const mongoose=require('mongoose');
const {PAYMENT_STATUS}=require('../utils/constants');
const paymentSchema=new mongoose.Schema({
  bookingId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'Booking'
  },
  amount:{
    type:Number,
    require:true,
    enum:{
      values:[PAYMENT_STATUS.success,PAYMENT_STATUS.failed,PAYMENT_STATUS.pending],
      message:"Invalid payment status"
    },
    default:"PENDING"
  }
},{timestamps:true});
const payment =mongoose.model('Payment',paymentSchema);

exports.module=payment