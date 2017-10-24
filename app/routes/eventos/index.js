/**
 * @swagger
 * resourcePath: /eventos
 * description: API Gestor de Elecciones
 */

const routes = require('express').Router();
const mysql = require('../../mysql-db/mysql.js');
const Promise = require('bluebird');
const logger = require('logger').createLogger('./logs/development.log'); 
const validator = require('validator');


/**
 * @swagger
 * path: /api/eventos
 * operations:
 *   -  httpMethod: GET
 *      summary: Devuelve la lista de los eventos existentes
 *      notes: 
 *      responseClass: eventos
 *      nickname: eventos
 *      consumes: 
 *        - text/html
 */

routes.get('/', function(req, res, next){  
    Promise.using(mysql(), function(connection) {
        return connection.query("SELECT o.nombre as nombreOrigen, origen AS idOrigen, e.descripcion AS descripcionEvento, url FROM eventos e INNER JOIN origenes o WHERE e.origen = o.id AND e.activo = 1").then(function(rows) {
            res.send({status: true, data : rows}).status(200);
        }).catch(function(error) {
            res.send({status: false, data : error}).status(500);
        });
    });
});

/**
 * @swagger
 * path: /api/eventos
 * operations:
 *   -  httpMethod: GET
 *      summary: Devuelve el evento correspondiente a un id
 *      notes: 
 *      responseClass: eventos
 *      nickname: eventos
 *      consumes: 
 *        - text/html
 *      parameters:
 *   -  name: id
 *      dataType: string
 *      paramType: URL-path
 *      required: true
 *      description: id de evento.
 */

 routes.get('/:id', function(req, res, next){  
    let idEvento = req.params.id;
    
    if(!validator.isEmpty(idEvento) && validator.isInt(idEvento)){
        Promise.using(mysql(), function(connection) {
            return connection.query("SELECT o.nombre as nombreOrigen, origen AS idOrigen, e.descripcion AS descripcionEvento, url FROM eventos e INNER JOIN origenes o WHERE e.origen = o.id AND e.id = '"+idEvento+"' AND e.activo = 1").then(function(rows) {
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
 * path: /api/eventos/id
 * operations:
 *   -  httpMethod: PUT
 *      summary: Servicio que actualiza el evento correpondiente al id dado.
 *      notes: 
 *      responseClass: eventos
 *      nickname: eventos
 *      consumes: 
 *        - text/html
 *      parameters:
 *   -  name: id
 *      dataType: string
 *      paramType: URL-path
 *      required: true
 *      description: id de evento.
 *   -  name: origen
 *      dataType: string
 *      paramType: body
 *      required: false
 *      description: id del origen del evento.
 *   -  name: descripcion
 *      dataType: string
 *      paramType: body
 *      required: false
 *      description: Descripción del evento.
 *   -  name: url
 *      dataType: string
 *      paramType: body
 *      required: false
 *      description: url del evento.
 */

routes.put('/:id', function(req, res, next){  

    let idEvento = req.params.id;
    let origen = req.body.origen;
    let descripcion = req.body.descripcion;
    let url = req.body.url;

    if(!validator.isEmpty(idOrigen) && validator.isInt(idEvento)){
        Promise.using(mysql(), function(connection) {
            return connection.query("UPDATE eventos SET origen ='"+origen+"', descripcion ='"+descripcion+"', url ='"+url+"' WHERE id = '" +idEvento+ "' AND activo = 1").then(function(rows) {
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
 * path: /api/eventos
 * operations:
 *   -  httpMethod: POST
 *      summary: Servicio que agrega un evento.
 *      notes: 
 *      responseClass: eventos
 *      nickname: eventos
 *      consumes: 
 *        - text/html
 *      parameters:
 *   -  name: origen
 *      dataType: string
 *      paramType: body
 *      required: true
 *      description: origen de evento.
 *   -  name: descripcion
 *      dataType: string
 *      paramType: body
 *      required: false
 *      description: descripcion de evento.
 *   -  name: url
 *      dataType: string
 *      paramType: body
 *      required: true
 *      description: url de evento.
 */

routes.post('/', function(req, res, next){  
    
    let origen = req.body.origen;
    let descripcion = req.body.descripcion;
    let url = req.body.url;

    if(!validator.isEmpty(origen) && validator.isInt(origen) && !validator.isEmpty(url)){
        Promise.using(mysql(), function(connection) {
            return connection.query("INSERT INTO eventos (origen,descripcion,url) VALUES ('"+origen+"','"+descripcion+"','"+url+"')").then(function(rows) {
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
 * path: /api/eventos/id
 * operations:
 *   -  httpMethod: DELETE
 *      summary: Servicio que elimina el evento correpondiente al id dado.
 *      notes: 
 *      responseClass: eventos
 *      nickname: eventos
 *      consumes: 
 *        - text/html
 *      parameters:
 *   -  name: id
 *      dataType: string
 *      paramType: URL-path
 *      required: true
 *      description: id de evento.
 */

routes.delete('/:id', function(req, res, next){  
    let idEvento = req.params.id;

    if(!validator.isEmpty(idEvento) && validator.isInt(idEvento)){
        Promise.using(mysql(), function(connection) {
            return connection.query("DELETE FROM eventos WHERE id ='"+idEvento+"'").then(function(rows) {
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
 *   codigoPostal:

 *     properties:
 *       id:
 *         type: String
 *       origen:
 *         type: String
 *       descripcion:
 *         type: String
 *       url:
 *         type: String
 */

module.exports = routes;