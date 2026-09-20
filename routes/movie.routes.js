const movieController=require('../controllers/movie.controller');
const MovieMiddlewares =require('../middlewares/movie.middlewares');

const routes=(app)=>{
  //routes function takes express app object as parameter

  //CREATE
  app.post('/mba/api/v1/movies',
    MovieMiddlewares.validateMovieCreateRequest,
    movieController.createMovie
  )

  //DELETE
  app.delete(
    '/mba/api/v1/movies/:movieId',
    movieController.deleteMovie
  );

  //READ
  app.get(
    '/mba/api/v1/movies/:id',
    movieController.getMovie
  )

  //UPDATE
  app.put('/mba/api/v1/movies/:id',movieController.updateMovie)

  //UPDATE
  app.patch('/mba/api/v1/movies/:id',movieController.updateMovie);

  //READ
  app.get('/mba/api/v1/movies',movieController.getMovies);
};



module.exports=routes;