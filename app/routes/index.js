const routes = require('express').Router();
const login = require('./login');
const usuarios = require('./usuarios');

routes.use('/login', login);
routes.use('/usuarios', usuarios);


routes.get('/', (req, res) => {
  res.status(200).json({ message: 'REST API - Gestor de elecciones..!' });
});

module.exports = routes;