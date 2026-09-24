const theatreController=require('../controllers/theatre.controller');
const theatreMiddleware=require('../middlewares/theatre.middleware');

const routes=(app)=>{
  //routes function takes express app object as parameter

  //CREATE
  app.post('/mba/api/v1/theatres',theatreMiddleware.validateTheatreCreateRequest,theatreController.create);

  //READ
  app.get('/mba/api/v1/theatres/:id',theatreController.getTheatre);

  //READ
  app.get('/mba/api/v1/theatres',theatreController.getTheatres);

  //DELETE
  app.delete('/mba/api/v1/theatres/:id',theatreController.destroy);

  app.patch('/mba/api/v1/theatres/:id/movies',theatreMiddleware.validateUpdateMoviesRequest,theatreController.updateMovies);

  //UPDATE
  app.patch('/mba/api/v1/theatres/:id',theatreController.update);


}

module.exports=routes;