/**
 * @swagger
 * resourcePath: /tiposUsuario
 * description: API Gestor de Elecciones
 */

const routes = require('express').Router();
const mysql = require('../../mysql-db/mysql.js');
const Promise = require('bluebird');
const logger = require('logger').createLogger('./logs/development.log'); 
const validator = require('validator');


/**
 * @swagger
 * path: /bibliohelp/tiposUsuario
 * operations:
 *   -  httpMethod: GET
 *      summary: Devuelve la lista de todos los tipos de usuario
 *      notes: 
 *      responseClass: tiposUsuario
 *      nickname: tiposUsuario
 *      consumes: 
 *        - text/html
 */

routes.get('/', function(req, res, next){  
    Promise.using(mysql(), function(connection) {
        return connection.query("SELECT tipo_usuario_id AS id, nombre FROM tipo_usuario").then(function(rows) {
            res.send({status: true, data : rows}).status(200);
        }).catch(function(error) {
            res.send({status: false, data : error}).status(500);
        });
    });
});



/**
 * @swagger
 * models:
 *   tiposUsuarios:
 *     properties:
 */

module.exports = routes;