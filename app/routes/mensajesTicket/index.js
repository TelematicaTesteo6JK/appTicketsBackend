/**
 * @swagger
 * resourcePath: /mensajesTicket
 * description: API Gestor de Elecciones
 */

const routes = require('express').Router();
const mysql = require('../../mysql-db/mysql.js');
const Promise = require('bluebird');
const logger = require('logger').createLogger('./logs/development.log'); 
const validator = require('validator');
const dateTime = require('node-datetime');

/**
 * @swagger
 * path: /bibliohelp/mensajesTicket/id
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

routes.get('/ticket/:idTicket/emisor/:idEmisor/receptor/:idReceptor', function(req, res, next){  

    let idTicket = req.params.idTicket;
    let idEmisor = req.params.idEmisor;
    let idReceptor = req.params.idReceptor;
    
    if(!validator.isEmpty(idUsuario) && idUsuario != undefined && validator.isInt(idUsuario)){
        Promise.using(mysql(), function(connection) {
            return connection.query("SELECT folio_ticket, fecha_hora, emisor_id AS emisor, receptor_id AS receptor,mensaje,movimiento FROM mensajes_ticket WHERE folio_ticket = '"+idTicket+"' AND emisor_id ='"+idEmisor+"' AND receptor_id = '"+idReceptor+"'").then(function(rows) {
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

routes.post('/', function(req, res, next){  
    
    let dt = dateTime.create();

    let idTicket = req.body.idTicket;
    let fecha_hora = dt.format('Y-m-d H:M:S');
    let idEmisor = req.body.idEmisor;
    let idReceptor = req.body.idReceptor;
    let mensaje = req.body.mensaje;
    let movimiento = req.body.movimiento;

        Promise.using(mysql(), function(connection) {
            return connection.query("INSERT INTO mensajes_ticket (folio_ticket, fecha_hora,emisor_id,receptor_id,mensaje,movimiento) VALUES ('"+idTicket+"','"+fecha_hora+"','"+idEmisor+"','"+idReceptor+"','"+mensaje+"','"+movimiento+"')").then(function(rows) {
            res.send({status: true, data : {"mensaje" : "Registro agregado correctamente."}}).status(200);
            }).catch(function(error) {
                res.send({status: false, data : error}).status(500);
            });
        });
}); 

/**
 * @swagger
 * models:
 *   tiposUsuarios:
 *     properties:
 */

 function correctInput(){
     
 }

module.exports = routes;