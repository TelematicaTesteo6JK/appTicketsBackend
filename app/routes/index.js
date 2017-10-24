const routes = require('express').Router();
const estados = require('./estados');
const ninjas = require('./ninjas');
const encuestas = require('./encuestas');
const registros = require('./registros');
const municipios = require('./municipios');
const codigoPostal = require('./codigoPostal');
const origenes = require('./origenes');
const eventos = require('./eventos');
const login = require('./login');
const capas = require('./capas');

routes.use('/estados', estados);
routes.use('/ninjas', ninjas);
routes.use('/encuestas', encuestas);
routes.use('/registros', registros);
routes.use('/municipios', municipios);
routes.use('/codigoPostal', codigoPostal);
routes.use('/origenes', origenes);
routes.use('/eventos', eventos);
routes.use('/login', login);
routes.use('/capas', capas);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'REST API - Gestor de elecciones..!' });
});

module.exports = routes;