const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require('mongoose');

//local module
const MovieRoutes=require('./routes/movie.routes');
const TheatreRoutes=require('./routes/theatre.routes')
env.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.set('debug',true);

MovieRoutes(app);
TheatreRoutes(app);

app.get('/', (req, res) => {
  return res.json({ message: 'Hello, World!' });
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
  mongoose.connect(process.env.DB_URL).then(()=>{console.log("Successfully connected to mongoose");
  }).catch((err)=>{
    console.error("Error connecting to mongoose:", err);
  });
  
});