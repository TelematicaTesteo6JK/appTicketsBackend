const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const path = require('path');
const mongoose = require('mongoose');
const swagger = require('../');
const logger = require('logger').createLogger('./logs/development.log'); 
const validator = require('validator');
const md5 = require('md5');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));    
app.use(bodyParser.json());

//Conecction to MongoDB Server...
//mongoose.connect('mongodb://localhost:27017/gestores?authSource=admin', { useMongoClient: true });
// mongoose.connect('mongodb://root:m0ng0@ec2-52-25-124-150.us-west-2.compute.amazonaws.com:27017/gestores?authSource=admin', { useMongoClient: true });
// mongoose.Promise = global.Promise;
// mongoose.connection.on('error', function(err){
//   logger.error(err);
// });


//CORS Origin..
app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});



app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


//Api Documentation with Swagger-express
app.use(swagger.init(app, {
  apiVersion: '1.0',
  swaggerVersion: '1.0',
  basePath: 'http://localhost:8080',
  swaggerURL: '/docs',
  swaggerJSON: '/bibliohelp-docs.json',
  swaggerUI: './public/swagger/',
  apis: ['./routes/usuarios/index.js',]
}));




//Includes routes files...
app.use('/bibliohelp', routes);


//Error Handler...
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: err
  });
});

app.listen(8080, function() {
  logger.info('Iniciando el servidor en el puerto: 8080');
  console.log('App listening on port 8080!');
});