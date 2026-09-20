const theatreController=require('../controllers/theatre.controller');
const theatreMiddleware=require('../middlewares/theatre.middleware');

const routes=(app)=>{
  app.post('/mba/api/v1/theatres',theatreMiddleware.validateTheatreCreateRequest,theatreController.create);

  app.get('/mba/api/v1/theatres/:id',theatreController.getTheatre);

  app.get('/mba/api/v1/theatres',theatreController.getTheatres);

  app.delete('/mba/api/v1/theatres/:id',theatreController.destroy);

<<<<<<< Updated upstream
=======
  //UPDATE
  app.patch('/mba/api/v1/theatres/:id',theatreController.update);

  app.patch('/mba/api/v1/theatres/:id/movies',theatreMiddleware.validateUpdateMoviesRequest,theatreController.updateMovies);
>>>>>>> Stashed changes
}

module.exports=routes;