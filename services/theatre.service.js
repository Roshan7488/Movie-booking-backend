const Theatre = require("../models/theatre.model");
const Movie =require('../models/movie.model')

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

const updateTheatre = async (id, data) => {
  try {
    const response = await Theatre.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return {
        err: "No theatre found for the given id",
        code: 404,
      };
    }
    return response;
  } catch (error) {
    if (error.name === "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      return { err: err, code: 422 };
    }
    throw error;
  }
};

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
const getAllTheatre = async (filter) => {
  try {
    let query = {};
    let pagination = {};
    if (filter && filter.city) {
      query.city = filter.city;
    }
    if (filter && filter.pincode) {
      query.pincode = filter.pincode;
    }
    if (filter && filter.name) {
      query.name = filter.name;
    }
    if(filter && filter.movieId){
      query.movies={$all:filter.movieId};// we can also write query.movies=filter.movieId>
    }
    if (filter && filter.limit) {
      pagination.limit = filter.limit;
    }
    if (filter && filter.skip !== undefined) {
      //for first page we send skip as 0
      let perPage = filter.limit ? filter.limit : 3;
      pagination.skip = filter.skip * perPage;
    }
    const response = await Theatre.find(query, {}, pagination); //(which theatres,which fields to return,limit and skip)
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 *
 * @param id-> the unique id using which we ccan identify the theatre to be deleted
 * @returns -> returns the deleted theatre object
 */
const deleteTheatre = async (id) => {
  try {
    const response = await Theatre.findByIdAndDelete(id);
    if (!response) {
      return {
        err: "No record of a theatre found for the given id",
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
 * @param theatreId -> unique id of the theatre for which we want to update movies
 * @param movieIds -> array of movie ids that are expectd to be updated in theatre
 * @param insert ->boolean that tells whether we want insert movies ot remove them
 * @returns -> updated theatre object
 */
const updateMoviesInTheatres = async (theatreId, movieIds, insert) => {
  try{
  //  const theatre=await Theatre.findById(theatreId);
  //  if(!theatre){
  //     return {
  //       err:"No such theatre found for the id provide",
  //       code:404
  //     }
  //  }
  let theatre;
  if (insert) {
    //we need to add movies
    // movieIds.forEach(movieId =>{
    //   theatre.movies.push(movieId);
    // });

    //this alternate way to add movie
   // Model.updateOne(filter, update); this is basic structure
    theatre=await Theatre.findByIdAndUpdate(
      { _id: theatreId },
      { $addToSet: { movies: { $each: movieIds } } },
      {new:true}
    );
  } else {
    //we need to remove movies
    // let savedMovieIds = theatre.movies;
    // movieIds.forEach((movieId) => {
    //   savedMovieIds = savedMovieIds.filter(
    //     (smi) => smi.toString() !== movieId.toString(),
    //   );
    // });
    // theatre.movies = savedMovieIds;
    theatre= await Theatre.updateOne(
      {_id: theatreId},
    {$pull:{movies:{$in:movieIds}}},
    {new:true}
  );
  }
  return theatre.populate("movies");
}catch(error){
  console.log("Error is",error);
  if(error.name==='TypeError'){
    return {
      err:'No theatre found for the given ID',
      code:404
    }
  }
  throw error;
}
};

const getMoviesInTheatre = async (id)=>{
  try{
  const theatre=await Theatre.findById(id,{name:1,movies:1,address:1});
  if(!theatre){
    return {
      err:'No theatre with the given id found',
      code:404
    }
  }
  return theatre.populate('movies')
  }catch(error){
    console.log(error);
    throw error;
  }

}

const checkMovieInATheatre=async (theatreId,movieId)=>{
  try{
    let response=await Theatre.findById(theatreId);
    if(!response){
      return {
        err:"No such theatre found for the given Id",
        code:404
      }
    }
    return response.movies.indexOf(movieId) !== -1;
  }catch(error){
    console.log(error);
    throw error;
  }
}
module.exports = {
  createTheatre,
  getTheatre,
  getAllTheatre,
  deleteTheatre,
  updateTheatre,
  updateMoviesInTheatres,
  getMoviesInTheatre,
  checkMovieInATheatre
};
