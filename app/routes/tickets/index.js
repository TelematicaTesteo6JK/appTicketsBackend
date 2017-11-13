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

//todos los tickets por id de encargado
routes.get('/encargado/:idEncargado', function (req, res, next) {
    let idEncargado = req.params.idEncargado;
    if (!idUsuario != undefined && validator.isInt(idEncargado)) {
        Promise.using(mysql(), function (connection) {
            return connection.query("SELECT folio, solicitante_id, encargado_id, asunto, calificacion, comentario, fecha_hora_alta, fecha_hora_cierre, estado_ticket_id FROM ticket WHERE encargado_id = '"+idEncargado+"'").then(function (rows) {
                res.send({ status: true, data: rows }).status(200);
            }).catch(function (error) {
                res.send({ status: false, data: error }).status(500);
            });
        });
    }
    else{
        res.status(400).send('Bad Request');
    }
});


//Todos los tickets por id de solicitante.
routes.get('/solicitante/:idSolicitante', function (req, res, next) {
    let idSolicitante = req.params.idSolicitante;
    if (!idSolicitante != undefined && validator.isInt(idSolicitante)) {
        Promise.using(mysql(), function (connection) {
            return connection.query("SELECT folio, solicitante_id, encargado_id, asunto, calificacion, comentario, fecha_hora_alta, fecha_hora_cierre, estado_ticket_id FROM ticket WHERE solicitante_id = '" + idSolicitante + "'").then(function (rows) {
                res.send({ status: true, data: rows }).status(200);
            }).catch(function (error) {
                res.send({ status: false, data: error }).status(500);
            });
        });
    }
    else{
        res.status(400).send('Bad Request');
    }
});

//Tickets sin asignar
routes.get('/solicitante/:idSolicitante/encargado/:idEncargado', function (req, res, next) {
    let idSolicitante = req.params.idSolicitante;
    if (!idSolicitante != undefined && validator.isInt(idSolicitante)) {
        Promise.using(mysql(), function (connection) {
            return connection.query("SELECT folio, solicitante_id, encargado_id, asunto, calificacion, comentario, fecha_hora_alta, fecha_hora_cierre, estado_ticket_id FROM ticket WHERE solicitante_id = null").then(function (rows) {
                res.send({ status: true, data: rows }).status(200);
            }).catch(function (error) {
                res.send({ status: false, data: error }).status(500);
            });
        });
    }
    else {
        res.status(400).send('Bad Request');
    }
});

//Modificar ticket 
routes.put('/:id', function (req, res, next) {

    let idTicket = req.params.id;
    let idSolicitante = req.body.idSolicitante;
    let idEncargado = req.body.idEncargado;
    let asunto = req.body.asunto;
    let calificacion = req.body.calificacion;
    let comentario = req.body.comentario;
    let fecha_hora_alta = req.body.fecha_hora_alta;
    let fecha_hora_cierre = req.body.fecha_hora_cierre;
    let estado_ticket = req.body.estado_ticket;

    if (!idSolicitante != undefined && validator.isInt(idSolicitante) && !idEncargado != undefined && validator.isInt(idEncargado)) {
        Promise.using(mysql(), function (connection) {
            return connection.query("UPDATE ticket SET solicitante_id ='" + idSolicitante + "', encargado_id ='" + idEncargado + "', asunto ='" + asunto + "', calificacion = '" + calificacion + "', comentario = '" + comentario + "', fecha_hora_alta = '"+fecha_hora_alta+"', fecha_hora_cierre = '"+fecha_hora_cierre+"', estado_ticket_id ='"+estado_ticket+"' WHERE solicitante_id = '" + idSolicitante + "' AND encargado_id ='"+idEncargado+"' WHERE folio = '"+idTicket+"'").then(function (rows) {
                res.send({ status: true, data: rows }).status(200);
            }).catch(function (error) {
                res.send({ status: false, data: error }).status(500);
            });
        });
    }
    else {
        res.status(400).send('Bad Request');
    }
});


routes.post('/', function (req, res, next) {

    let idSolicitante = req.body.idSolicitante;
    let idEncargado = req.body.idEncargado;
    let asunto = req.body.asunto;
    let calificacion = req.body.calificacion;
    let comentario = req.body.comentario;
    let fecha_hora_alta = req.body.fecha_hora_alta;
    let fecha_hora_cierre = req.body.fecha_hora_cierre;
    let estado_ticket = req.body.estado_ticket;

    Promise.using(mysql(), function (connection) {
        return connection.query("INSERT INTO usuario (solicitante_id, encargado_id, asunto, calificacion, comentario, fecha_hora_alta, fecha_hora_cierre, estado_ticket_id) VALUES ('" + idSolicitante + "','" + idEncargado + "','" + asunto + "','" + calificacion + "','" + comentario + "','" + fecha_hora_alta + "','"+fecha_hora_cierre+"','"+estado_ticket+"')").then(function (rows) {
            res.send({ status: true, data: { "mensaje": "Registro agregado correctamente." } }).status(200);
        }).catch(function (error) {
            res.send({ status: false, data: error }).status(500);
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