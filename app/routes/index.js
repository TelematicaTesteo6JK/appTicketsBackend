const routes = require('express').Router();
const login = require('./login');
const usuarios = require('./usuarios');
const tiposUsuario = require('./tiposUsuario');
const planteles = require('./planteles');
const mensajesTicket = require('./mensajesTicket');
const estadosTicket = require('./estadosTicket');
const tickets = require('./tickets');

routes.use('/login', login);
routes.use('/usuarios', usuarios);
routes.use('/tiposUsuario', tiposUsuario);
routes.use('/planteles', planteles);
routes.use('/mensajesTicket', mensajesTicket);
routes.use('/estadosTicket', estadosTicket);
routes.use('/tickets', tickets);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'REST API - Gestor de elecciones..!' });
});

module.exports = routes;