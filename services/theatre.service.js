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
    if(filter && filter.city){
      query.city=filter.city;
    }
    if(filter && filter.pincode){
      query.pincode=filter.pincode;
    }
    if(filter && filter.name){
      query.name=filter.name;
    }
    const response = await Theatre.find(query);
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
 * @param id -> the unique id to identify the theatre to be updated
 * @param data -> data object to be used to update the theatre
 * @returns -> it returns the new updated theatre object
 */

module.exports = {
  createTheatre,
  getTheatre,
  getAllTheatre,
  deleteTheatre
};
