const routes = require('express').Router();
const login = require('./login');
const usuarios = require('./usuarios');
const tiposUsuario = require('./tiposUsuario');

routes.use('/login', login);
routes.use('/usuarios', usuarios);
routes.use('/tiposUsuario', tiposUsuario);


routes.get('/', (req, res) => {
  res.status(200).json({ message: 'REST API - Gestor de elecciones..!' });
});

module.exports = routes;