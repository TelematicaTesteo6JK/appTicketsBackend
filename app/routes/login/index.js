/**
 * @swagger
 * resourcePath: /login
 * description: API Gestor de Elecciones
 */

const routes = require('express').Router();
const mysql = require('../../mysql-db/mysql.js');
const Promise = require('bluebird');
const logger = require('logger').createLogger('./logs/development.log'); 
const md5 = require('md5');

/**
 * @swagger
 * path: /api/login
 * operations:
 *   -  httpMethod: GET
 *      summary: Logue a un usuario al sistema
 *      notes: Login
 *      responseClass: login
 *      nickname: login
 *      consumes: 
 *        - text/html
 *      parameters:
 *   -  name: username
 *      dataType: string
 *      paramType: query
 *      required: true
 *      description: Nombre de usuario.
 *   -  name: password
 *      dataType: string
 *      paramType: query
 *      required: true
 *      description: Contraseña tipo MD5.
 */

routes.get('/', function(req, res, next){

    let username = req.query.username;
    let password = req.query.password; 

    Promise.using(mysql(), function(connection) {
        return connection.query('SELECT id FROM usuarios u INNER JOIN uruarios_roles ur WHERE u.id = ur.usuario AND u.username = "'+username+'" AND u.password = "'+password+'" AND ur.rol = 1').then(function(rows) {  
            if(Object.keys(rows).length == 1)
            res.send({status: true, data : rows}).status(200);
            else
            res.send({status: false, data : { "mensaje": "No autorizado"}}).status(200);
        }).catch(function(error) {
            res.send({status: false, data : error}).status(500);
        });
    });
})

/**
 * @swagger
 * models:
 *   codigoPostal:

 *     properties:
 *       username:
 *         type: String
 *       password:
 *         type: MD5
 */

module.exports = routes;