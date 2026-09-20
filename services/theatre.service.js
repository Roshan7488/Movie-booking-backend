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

<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  deleteTheatre
=======
  deleteTheatre,
  updateTheatre,
  updateMoviesInTheatres
>>>>>>> Stashed changes
};
