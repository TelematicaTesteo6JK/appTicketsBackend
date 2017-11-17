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
routes.get('/', function (req, res, next) {
    let username = req.query.params;
    let password = req.query.params;

        Promise.using(mysql(), function (connection) {
            return connection.query("SELECT usuario_id FROM usuario WHERE email = '" + username + "' AND password = '" + password + "'").then(function (rows) {
                if (Object.keys(rows).length == 1)
                    res.send({ status: true, data: rows }).status(200);
                else
                    return res.send({ status: false, data: { "mensaje": "Accesso no autorizado" } }).status(200);
                }).catch(function (error) {
                    res.send({ status: false, data: error }).status(500);
                });
        });   
});


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