const Theatre = require("../models/theatre.model");

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

module.exports = {
  createTheatre,
  getTheatre,
  getAllTheatre,
  deleteTheatre
};
