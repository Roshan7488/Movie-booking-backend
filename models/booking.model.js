const mongoose = require('mongoose');
const {BOOKING_STATUS}=require('../utils/constants');

const bookingSchema = new mongoose.Schema({
  theatreId:{
    type:mongoose.Schema.Types.ObjectId,
    require:true,
    ref:'Theatre'
  },
  movieId:{
    type:mongoose.Schema.Types.ObjectId,
    require:true,
    ref:'Movie'
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    require:true,
    ref:'User'
  },
  timings:{
    type:String,
    require:true
  },
  noOfSeats:{
    type:Number,
    require:true
  },
  totalCost:{
    type:Number
  },
  status:{
    type:String,
    require:true,
    enum:{
      values:[BOOKING_STATUS.processing,BOOKING_STATUS.cancelled,BOOKING_STATUS.successfull],
      message:"Invalid booking status"
    },
    default:BOOKING_STATUS.processing
  }
},{timestamps:true});

const Booking =new mongoose.model('Booking',bookingSchema);
module.exports=Booking;