/**
 * @swagger
 * resourcePath: /origenes
 * description: API Gestor de Elecciones
 */

const routes = require('express').Router();
const mysql = require('../../mysql-db/mysql.js');
const Promise = require('bluebird');
const logger = require('logger').createLogger('./logs/development.log'); 
const validator = require('validator');


/**
 * @swagger
 * path: /api/origenes
 * operations:
 *   -  httpMethod: GET
 *      summary: Devuelve la lista de los origenes.
 *      notes: Devuelve la lista de origenes.
 *      responseClass: Origenes
 *      nickname: Origenes
 *      consumes: 
 *        - text/html
 */

routes.get('/', function(req, res, next){  
    Promise.using(mysql(), function(connection) {
        return connection.query("SELECT nombre AS nombreOrigen, usuario, descripcion FROM origenes WHERE activo = 1").then(function(rows) {
            res.send({status: true, data : rows}).status(200);
        }).catch(function(error) {
            res.send({status: false, data : error}).status(500);
        });
    });
});

/**
 * @swagger
 * path: /api/codigoPostal
 * operations:
 *   -  httpMethod: GET
 *      summary: Devuelve la lista de códigos los origenes
 *      notes: Devuelve la lista de códigos origenes
 *      responseClass: origenes
 *      nickname: origenes
 *      consumes: 
 *        - text/html
 *      parameters:
 *   -  name: id
 *      dataType: string
 *      paramType: URL-path
 *      required: false
 *      description: id numérico de origen.
 */

 routes.get('/:id', function(req, res, next){  
    let idOrigen = req.params.id;
    
    if(!validator.isEmpty(idOrigen) && validator.isInt(idOrigen)){
        Promise.using(mysql(), function(connection) {
            return connection.query("SELECT nombre AS nombreOrigen, usuario, descripcion FROM origenes WHERE id ='"+idOrigen+"' AND activo = 1").then(function(rows) {
                res.send({status: true, data : rows}).status(200);
            }).catch(function(error) {
                res.send({status: false, data : error}).status(500);
            });
        });
    }
    else{
        res.status(400).send('Bad Request');   
    }
});

 /**
 * @swagger
 * path: /api/origenes/:id
 * operations:
 *   -  httpMethod: PUT
 *      summary: Servicio que actualiza el origen correpondiente al id dado.
 *      notes: Actualización de un origen.
 *      responseClass: Origenes
 *      nickname: Origenes
 *      consumes: 
 *        - text/html
 *      parameters:
 *   -  name: id
 *      dataType: string
 *      paramType: ULR-path
 *      required: false
 *      description: id numérico de origen.
 */

routes.put('/:id', function(req, res, next){  

    let idOrigen = req.params.id;
    let nombre = req.body.nombre;
    let usuario = req.body.usuario;
    let descripcion = req.body.descripcion;
    if(!validator.isEmpty(idOrigen) && validator.isInt(idOrigen)){
        Promise.using(mysql(), function(connection) {
            return connection.query("UPDATE origenes SET nombre ='"+nombre+"', usuario ='"+usuario+"', descripcion ='"+descripcion+"' WHERE id = '" +idOrigen+ "' AND activo = 1").then(function(rows) {
                res.send({status: true, data : rows}).status(200);
            }).catch(function(error) {
                res.send({status: false, data : error}).status(500);
            });
        });
    }
    else{
        res.status(400).send('Bad Request');
    }
});

 /**
 * @swagger
 * path: /api/origenes
 * operations:
 *   -  httpMethod: POST
 *      summary: Servicio que agrega un origen.
 *      notes: Agrega un origen.
 *      responseClass: Origenes
 *      nickname: Origenes
 *      consumes: 
 *        - text/html
 *      parameters:
 *   -  name: nombre
 *      dataType: string
 *      paramType: body
 *      required: false
 *      description: Nombre del origen.
 *   -  name: usuario
 *      dataType: string
 *      paramType: body
 *      required: false
 *      description: Usuario que ha creado el origen.
 *   -  name: descripcion
 *      dataType: string
 *      paramType: body
 *      required: false
 *      description: Descripción del origen.
 */

routes.post('/', function(req, res, next){  
    
    let nombre = req.body.nombre;
    let usuario = req.body.usuario;
    let descripcion = req.body.descripcion;

    if(!validator.isEmpty(nombre) && !validator.isEmpty(usuario)){
        Promise.using(mysql(), function(connection) {
            return connection.query("INSERT INTO origenes (nombre,usuario,descripcion) VALUES ('"+nombre+"','"+usuario+"','"+descripcion+"')").then(function(rows) {
            res.send({status: true, data : req.body}).status(200);
            }).catch(function(error) {
                res.send({status: false, data : error}).status(500);
            });
        });
    }
    else{
        res.status(400).send('Bad Request') 
    }
});

/**
 * @swagger
 * path: /api/origenes/:id
 * operations:
 *   -  httpMethod: DELETE
 *      summary: Servicio que elimina el origen correpondiente al id dado.
 *      notes: Actualización de un origen.
 *      responseClass: Origenes
 *      nickname: Origenes
 *      consumes: 
 *        - text/html
 *      parameters:
 *   -  name: id
 *      dataType: string
 *      paramType: query
 *      required: false
 *      description: id numérico de origen.
 */

routes.delete('/:id', function(req, res, next){  
    let idOrigen = req.params.id;

    if(!validator.isEmpty(idOrigen) && validator.isInt(idOrigen)){
        Promise.using(mysql(), function(connection) {
            return connection.query("DELETE FROM origenes WHERE id ='"+idOrigen+"'").then(function(rows) {
                res.send({status: true, data : rows}).status(200);
            }).catch(function(error) {
                res.send({status: false, data : error}).status(500);
            });
        });
    }
    else{
        res.status(400).send('Bad Request') 
    }
});

/**
 * @swagger
 * models:
 *   origenes:

 *     properties:
 *       id:
 *         type: String
 *       nombre:
 *          type: String
 *       usuario:
 *          type: String
 *       descripción:
 *          type: String
 */

module.exports = routes;