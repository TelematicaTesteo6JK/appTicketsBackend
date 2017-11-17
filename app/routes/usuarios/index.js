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
    Promise.using(mysql(), function(connection) {
        return connection.query("SELECT u.usuario_id, u.nombre, u.apellidos, p.Nombre, email AS correo FROM usuario u INNER JOIN plantel p WHERE u.plantel_id = p.plantel_id").then(function(rows) {
            res.send({status: true, data : rows}).status(200);
        }).catch(function(error) {
            res.send({status: false, data : error}).status(500);
        });
    });
});

/**
 * @swagger
 * path: /bibliohelp/usuarios/id
 * operations:
 *   -  httpMethod: GET
 *      summary: Devuelve el ususario correspondiente al id dado
 *      notes: 
 *      responseClass: usuarios
 *      nickname: usuarios
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: id
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: id del usuario
 */

 routes.get('/:id', function(req, res, next){  
    let idUsuario = req.params.id;
    
    if(!validator.isEmpty(idUsuario) && idUsuario != undefined && validator.isInt(idUsuario)){
        Promise.using(mysql(), function(connection) {
            return connection.query("SELECT u.nombre, u.apellidos, u.plantel_id, p.Nombre AS plantel, email AS correo, u.tipo_usuario_id FROM usuario u INNER JOIN plantel p WHERE u.plantel_id = p.plantel_id AND u.usuario_id = '"+idUsuario+"'").then(function(rows) {
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
 * path: /bibliohelp/usuarios/id
 * operations:
 *   -  httpMethod: PUT
 *      summary: Actualiza los datos correspondientes al usuario del id dado.
 *      notes: 
 *      responseClass: usuarios
 *      nickname: usuarios
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: id
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: id del usuario
 *        - name: nombre
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: id del usuario
 *        - name: apellidos
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: id del usuario
 *        - name: email
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: id del usuario
 *        - name: plantel_id
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: id del usuario
 *        - name: tipo_usuario
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: id del usuario
 */

routes.put('/:id', function(req, res, next){  

    let idUsuario = req.params.id;
    let nombre = req.body.nombre;
    let apellidos = req.body.usuario;
    let email = req.body.email;
    let plantel_id = req.body.plantel_id;
    let tipoUsuario = req.body.tipo_usuario;

    if(!validator.isEmpty(idUsuario) && idUsuario != undefined && validator.isInt(idOrigen)){
        Promise.using(mysql(), function(connection) {
            return connection.query("UPDATE usuario SET nombre ='"+nombre+"', apellidos ='"+apellidos+"', email ='"+email+"', plantel_id = '"+plantel_id+"', tipo_usuario_id = '"+tipoUsuario+"' WHERE id = '" +idUsuario+ "'").then(function(rows) {
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
 * path: /bibliohelp/usuarios
 * operations:
 *   -  httpMethod: POST
 *      summary: Agrega un usuario
 *      notes: 
 *      responseClass: usuarios
 *      nickname: usuarios
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: id
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: id del usuario
 */

routes.post('/', function(req, res, next){  
    
    let password = req.body.password;
    let nombre = req.body.nombre;
    let apellidos = req.body.apellidos;
    let email = req.body.email;
    let plantel_id = req.body.plantel_id;
    let tipoUsuario = req.body.tipo_usuario;

    Promise.using(mysql(), function (connection) {
        return connection.query("SELECT usuario_id FROM usuario WHERE email = '" + username + "'").then(function (rows) {
            if (Object.keys(rows).length == 1)
                res.send({ status: false, data: { "mensaje": "Ya se han registrado con éste email" } }).status(200);
            else{
                Promise.using(mysql(), function (connection) {
                    return connection.query("INSERT INTO usuario (nombre,apellidos,password,email,plantel_id,tipo_usuario_id) VALUES ('" + nombre + "','" + apellidos + "','" + password + "','" + email + "','" + plantel_id + "','" + tipoUsuario + "')").then(function (rows) {
                        res.send({ status: true, data: { "mensaje": "Registro agregado correctamente." } }).status(200);
                    }).catch(function (error) {
                        res.send({ status: false, data: error }).status(500);
                    });
                });
            }
        }).catch(function (error) {
            res.send({ status: false, data: error }).status(500);
        });
    });
});



routes.delete('/:id', function(req, res, next){  
    let idUsuario = req.params.id;

    if(!validator.isEmpty(idUsuario) && validator.isInt(idUsuario)){
        Promise.using(mysql(), function(connection) {
            return connection.query("DELETE FROM origenes WHERE id ='"+idUsuario+"'").then(function(rows) {
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
 *   usuarios:

 *     properties:
 *       id:
 *         type: String
 */

module.exports = routes;