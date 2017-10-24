/**
 * @swagger
 * resourcePath: /registros
 * description: API Gestor de Elecciones
 */

const routes = require('express').Router();
const Persona = require('../../models/persona');
const logger = require('logger').createLogger('./logs/development.log'); 
const mongoose = require('mongoose');
const validator = require('validator');

/**
 * @swagger
 * path: /api/registros
 * operations:
 *   -  httpMethod: POST
 *      summary: Realiza el registro de una persona, incluye la fecha de creación, modificación, status, y versión del JSON con la que se crea.
 *      notes: Registro de una persona.
 *      responseClass: Persona
 *      nickname: login
 *      consumes: 
 *        - text/html
 *      parameters:
 *   -  name: json_version
 *      dataType: String
 *      paramType: body
 *      required: true
 *      description: Versión del json con el que se realizó el registro.
 *   -  name: persona
 *      dataType: json object
 *      paramType: body
 *      required: true
 *      description: Objeto json con el registro de la persona.
 *   -  name: padre
 *      dataType: String
 *      paramType: body
 *      required: true
 *      description: id de la persona que se ha logueado en la aplicación.
 */

routes.post('/', function(req, res, next){
    Persona.create(req.body).then(function(persona){
        res.send(persona);
    }).catch(next);
});

/**
 * @swagger
 * models:
 *   codigoPostal:

 *     properties:
 *       json_version:
 *         type: String
 *       persona:
 *         type: String
 *       padre:
 *          type: String
 */

module.exports = routes;