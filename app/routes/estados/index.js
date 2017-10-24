/**
 * @swagger
 * resourcePath: /estados
 * description: API Gestor de Elecciones
 */

const routes = require('express').Router();
const mysql = require('../../mysql-db/mysql.js');
const Promise = require('bluebird');
const logger = require('logger').createLogger('./logs/development.log'); 



/**
 * @swagger
 * path: /api/estados
 * operations:
 *   -  httpMethod: GET
 *      summary: Devuelve la lista de todos los estados de la República.
 *      notes: Es listado devuelve clave del estado como cve_estado y estado.
 *      responseClass: estados
 *      nickname: estados
 *      consumes: 
 *        - text/html
 */


routes.get('/', function(req, res, next){
    Promise.using(mysql(), function(connection) {
        return connection.query('SELECT cve_estado, estado FROM estados').then(function(rows) {
            res.send({status: true, data : rows}).status(200);
        }).catch(function(error) {
            res.send({status: false, data : error}).status(500);
        });
    });
})

module.exports = routes;