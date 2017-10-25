const routes = require('express').Router();
const login = require('./login');

routes.use('/login', login);


routes.get('/', (req, res) => {
  res.status(200).json({ message: 'REST API - Gestor de elecciones..!' });
});

module.exports = routes;