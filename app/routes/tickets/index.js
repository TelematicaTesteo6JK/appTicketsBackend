/**
 * @swagger
 * resourcePath: /usuarios
 * description: API Gestor de Elecciones
 */

const routes = require('express').Router();
const mysql = require('../../mysql-db/mysql.js');
const Promise = require('bluebird');
const logger = require('logger').createLogger('./logs/development.log'); 
const validator = require('validator');


/**
 * @swagger
 * path: /bibliohelp/usuarios
 * operations:
 *   -  httpMethod: GET
 *      summary: Devuelve la lista de todos los usuarios
 *      notes: Devuelve la lista de los usuarios
 *      responseClass: usuarios
 *      nickname: usuarios
 *      consumes: 
 *        - text/html
 */

routes.get('/', function(req, res, next){
    
        let idSolicitante = req.query.solicitante_id;
        if(idSolicitante != undefined && !validator.isInt(idSolicitante))
            return res.send({status: false, error : 'Bad request: solicitante_id must be an integer.'}).status(500);
    
        let idEncargado = req.query.encargado_id;
        if(idEncargado != undefined && !validator.isInt(idEncargado))
            return res.send({status: false, error : 'Bad request: encargado_id must be an integer.'}).status(500);
    
        
        let whereIdSolicitante = (idSolicitante != undefined) ? ' WHERE solicitante_id = ' + idSolicitante : '';
        let whereIdEncargado = (idEncargado != undefined) ? ' WHERE encargado_id = ' + idEncargado : '';
    
        let queryString;
        
        if (Object.keys(req.query).length === 0)
            queryString = "SELECT solicitante_id, encargado_id, asunto, calificacion, comentario, fecha_hora_alta, fecha_hora_cierre, estado_ticket_id FROM ticket";
        else if(idEncargado === undefined && idSolicitante != undefined)
            queryString = "SELECT solicitante_id, encargado_id, asunto, calificacion, comentario, fecha_hora_alta, fecha_hora_cierre, estado_ticket_id FROM ticket" + whereIdSolicitante;
        else if(idSolicitante === undefined && idEncargado != undefined) 
        queryString = "SELECT solicitante_id, encargado_id, asunto, calificacion, comentario, fecha_hora_alta, fecha_hora_cierre, estado_ticket_id FROM ticket" + whereIdEncargado;
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
 *   usuarios:

 *     properties:
 *       id:
 *         type: String
 */

module.exports = routes;