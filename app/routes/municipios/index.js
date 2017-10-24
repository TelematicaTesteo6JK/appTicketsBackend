/**
 * @swagger
 * resourcePath: /municipios
 * description: API Gestor de Elecciones
 */

const routes = require('express').Router();
const mysql = require('../../mysql-db/mysql.js');
const Promise = require('bluebird');
const logger = require('logger').createLogger('./logs/development.log'); 
const validator = require('validator');


/**
 * @swagger
 * path: /api/municipios
 * operations:
 *   -  httpMethod: GET
 *      summary: Devuelve la lista de los municipios
 *      notes: Lista municipios
 *      responseClass: municipios
 *      nickname: municipios
 *      consumes: 
 *        - text/html
 *      parameters:
 *   -  name: cve_estado
 *      dataType: string
 *      paramType: query
 *      required: false
 *      description: Codigo de estado a dos dígitos.
 */

routes.get('/', function(req, res, next){
    let cve_estado = req.query.cve_estado;
    if(cve_estado != undefined && cve_estado.length != 2)
        return res.send({status: false, error : 'Bad request: cve_estado must be two characters length.'}).status(500);

    let whereClaveEstado = (cve_estado != undefined) ? ' WHERE cve_estado = ' + cve_estado : '';
    let queryString;
    
    if (Object.keys(req.query).length === 0)
        queryString = "SELECT cve_estado cveEstado, cve_municipio cveMunicipio, municipio FROM municipios";
    else
        queryString = "SELECT cve_municipio as val, municipio as text, false as checked FROM municipios" + whereClaveEstado;

    
        Promise.using(mysql(), function(connection) {
            return connection.query(queryString).then(function(rows) {
                res.send({status: true, data : rows}).status(200);
            }).catch(function(error) {
                res.send({status: false, data : error}).status(500);
            });
        });
});

/**
 * @swagger
 * models:
 *   Municipio:

 *     properties:
 *       cveEstado:
 *         type: String
 */

module.exports = routes;