const Movie=require('../models/movie.model');

const createMovie=async (data)=>{
  try{
    const movie= await Movie.create(data);
    return movie;
  }catch(error){
    console.log(error);
    if(error.name=='ValidationError'){
      let err={};
      Object.keys(error.errors).forEach((key)=>{
        err[key]=error.errors[key].message;
      });
      console.log(err);
      return {err:err,code:422}
    }else{
    throw err;
    } 

  }
}

const deleteMovie =async (id)=>{
  const response=await Movie.findByIdAndDelete(id);
  return response;
}

const getMovieById=async (id)=>{
  const movie= await Movie.findById(id);
  if(!movie){
    return {
      err:"No movie found for the corresponding id provided",
      code:404
    }
  };
  return movie;
}

const updateMovie = async (id,data)=>{
  try{
  const movie = await Movie.findByIdAndUpdate(id,data,{ new: true,runValidators:true });
  return movie;
  }catch(error){
     console.log(error);
    if(error.name=='ValidationError'){
      let err={};
      Object.keys(error.errors).forEach((key)=>{
        err[key]=error.errors[key].message;
      });
      console.log(err);
      return {err:err,code:422}
    }else{
    throw err;
    } 
  }
}

module.exports={
  getMovieById,
  createMovie,
  deleteMovie,
  updateMovie
}