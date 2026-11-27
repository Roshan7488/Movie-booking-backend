const mongoose =require('mongoose');
const showSchema=new mongoose.Schema({
  theatreId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  },
  movieId:{
    type:mongoose.Schema.Types.ObjectId,
    require:true
  },
  timing:{
    type:String,
    require:true
  },
  noOfSeats:{
    type:Number,
    require:true
  },
  price:{
    type:Number,
    require:true
  },
  format:{
    type:String
  }
},{timestamps:true});

const Show=mongoose.model('Show',showSchema);
module.exports=Show;