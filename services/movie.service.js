const Movie=require('../models/movie.model');

/**
 * 
 * @param  data->object containing details of the new movie to be created
 * @returns->returns the new movie object created
 */
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

/**
 * 
 * @param id -> id which will used to indentify  the movie to be deleted
 * @returns-> object containing details the movie deleted 
 */

const deleteMovie =async (id)=>{
  const response=await Movie.findByIdAndDelete(id);
  if(!response){
    return {
      err:"No movie record found for the id provided",
    code:404
  }
}
  return response;
}

/**
 * 
 * @param  id->id which will be used to identify the movie to be fetched 
 * @returns -> object containing movie fateched
 */
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

/**
 * 
 * @param  id-> id which will be used to identify the movie to updated 
 * @param  data-> object that contains actual data ehich id to be updated in the db  
 * @returns -> returns the new updated movie details 
 */
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

/**
 * 
 * @param filter -> filter will help us in filtering out data based on the conditionals 
 * @returns -> returns an object containing all the movies  fatched based on the filter
 */
const fetchMovies=async (filter)=>{
  let query={};
  if(filter.name){
    query.name=filter.name;
  }
  let movies= await Movie.find(query);
  if(!movies){
    return {
      err:'Not able to find the queries movies',
      code:404
    }
  }
  return movies;
}

module.exports={
  getMovieById,
  createMovie,
  deleteMovie,
  updateMovie,
  fetchMovies
}