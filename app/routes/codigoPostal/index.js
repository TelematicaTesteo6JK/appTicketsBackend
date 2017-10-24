/**
 * @swagger
 * resourcePath: /codigoPostal
 * description: API Gestor de Elecciones
 */

const routes = require('express').Router();
const mysql = require('../../mysql-db/mysql.js');
const Promise = require('bluebird');
const logger = require('logger').createLogger('./logs/development.log'); 


/**
 * @swagger
 * path: /api/codigoPostal
 * operations:
 *   -  httpMethod: GET
 *      summary: Devuelve la lista de códigos postales
 *      notes: Devuelve la lista de códigos postales
 *      responseClass: codigoPostal
 *      nickname: codigoPostal
 *      consumes: 
 *        - text/html
 *      parameters:
 *   -  name: cve_estado
 *      dataType: string
 *      paramType: query
 *      required: false
 *      description: Codigo de estado a dos dígitos.
 *   -  name: cve_municipio
 *      dataType: string
 *      paramType: query
 *      required: false
 *      description: Codigo de municipio a tres dígitos.
 */

routes.get('/', function(req, res, next){

    let cve_estado = req.query.cve_estado;
    if(cve_estado != undefined && cve_estado.length != 2)
        return res.send({status: false, error : 'Bad request: cve_estado must be two characters length.'}).status(500);

    let cve_municipio = req.query.cve_municipio;
    if(cve_municipio != undefined && cve_municipio.length != 3)
        return res.send({status: false, error : 'Bad request: cve_municipio must be three characters length.'}).status(500);

    let whereClaveEstado = (cve_estado != undefined) ? ' WHERE cve_estado = ' + cve_estado : '';
    let whereClaveMunicipio = (cve_municipio != undefined) ? ' AND cve_municipio = ' + cve_municipio : '';
    let queryString;
    
    if (Object.keys(req.query).length === 0)
        queryString = "SELECT DISTINCT cve_estado cveEstado, cve_municipio cveMunicipio, codigoPostal, asentamiento colonia FROM codigopostal WHERE cve_estado = 19";
    else
        queryString = "SELECT DISTINCT codigoPostal val, codigoPostal text, false checked FROM codigopostal" + whereClaveEstado + whereClaveMunicipio;

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
 *   codigoPostal:

 *     properties:
 *       cveEstado:
 *         type: String
 *       estado:
 *         type: String
 */

module.exports = routes;