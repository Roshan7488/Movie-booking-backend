const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength:2
  },
  description: {
    type: String,
    required: true,
    minLength:5
  },
  casts: {
    type: [String],
    required: true
  },
  trailerUrl: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true,
    default: 'English'
  },
  releaseDate: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  releaseStatus:{
    type:String,
    required:true,
    default:"RELEASED"
  },
  // createdAt: "2026-09-14T10:00:00.000Z",
  // updatedAt: "2026-09-14T10:00:00.000Z"
},
{timestamps:true});

const Movie=mongoose.model('Movie',movieSchema);
module.exports=Movie;