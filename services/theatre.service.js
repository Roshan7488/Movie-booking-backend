const Theatre = require("../models/theatre.model");

/**
 * 
 * @params data -> object containing details of the theatre to be created
 * @returns -> object with the new theatre details
 */
const createTheatre = async (data) => {
  try {
    const response = await Theatre.create(data);
    return response;
  } catch (error) {
    if (error.name === "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      console.log(err);
      return { err: err, code: 422 };
    } else {
      throw error;
    }
  }
};


const updateTheatre= async (id,data)=>{
  try{
  const response=await Theatre.findByIdAndUpdate(id,data,{new:true,runValidators:true});
  if(!response){
    return {
      err:"No theatre found for the given id",
      code:404
    }
  }
  return response;
  }catch(error){
    if(error.name === 'ValidationError'){
      let err={};
      Object.keys(error.errors).forEach((key)=>{
        err[key]=error.errors[key].message;
      });
      return {err:err,code:422}
    }
    throw error;
  }
}

/**
 * 
 * @param  id 
 * @returns 
 */
const getTheatre = async (id) => {
  try {
    const response = await Theatre.findById(id);
    if (!response) {
      return {
        err: "No theatre found for the given id",
        code: 404,
      };
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * 
 * @param  data -> the data to be used to filter out theatres based on city / pincode 
 * @returns -> returns an object with the filtered content of theatres
 */
const getAllTheatre=async (filter)=>{
  try{
    let query={};
    let pagination={};
    if(filter && filter.city){
      query.city=filter.city;
    }
    if(filter && filter.pincode){
      query.pincode=filter.pincode;
    }
    if(filter && filter.name){
      query.name=filter.name;
    }
    if(filter && filter.limit){
      pagination.limit=filter.limit;
    }
    if(filter && filter.skip){
      //for first page we send skip as 0
      let perPage = (filter.limit) ? filter.limit : 3;
      pagination.skip=filter.skip * perPage;
   }
    const response = await Theatre.find(query,{},pagination);//(which theatres,which fields to return,limit and skip)
  return response;
}
catch(error){
    console.log(error);
    throw error;
}
}

/**
 * 
 * @param id-> the unique id using which we ccan identify the theatre to be deleted 
 * @returns -> returns the deleted theatre object
 */
const deleteTheatre= async (id)=>{
  try{
    const response= await Theatre.findByIdAndDelete(id);
    if(!response){
      return {
        err:"No record of a theatre found for the given id",
        code:404
      }
    }
    return response;
  }catch(error){
    console.log(error);
    throw error;
  }
}

/**
 * 
 * @param theatreId -> unique id of the theatre for which we want to update movies
 * @param movieIds -> array of movie ids that are expectd to be updated in theatre
 * @param insert ->boolean that tells whether we want insert movies ot remove them
 * @returns -> updated theatre object
 */
const updateMoviesInTheatres= async (theatreId,movieIds,insert)=>{
     const theatre=await Theatre.findById(theatreId);
     if(!theatre){
        return {
          err:"No such theatre found for the id provide",
          code:404
        }
     }
     if(insert){
      //we need to add movies
      movieIds.forEach(movieId =>{
        theatre.movies.push(movieId);
      });
     }else{
      //we need to remove movies
      let savedMovieIds=theatre.movies;
      movieIds.forEach(movieId=>{
        savedMovieIds=savedMovieIds.filter(smi => smi.toString() !== movieId.toString());
      });
      theatre.movies=savedMovieIds;
     }
     await theatre.save();
     return theatre.populate('movies');
}

module.exports = {
  createTheatre,
  getTheatre,
  getAllTheatre,
  deleteTheatre,
  updateTheatre,
  updateMoviesInTheatres
};
