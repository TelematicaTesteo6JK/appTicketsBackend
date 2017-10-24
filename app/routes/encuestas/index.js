/**
 * @swagger
 * resourcePath: /encuestas
 * description: API Gestor de Elecciones
 */

const routes = require('express').Router();
const mysql = require('../../mysql-db/mysql.js');
const Promise = require('bluebird');
const logger = require('logger').createLogger('./logs/development.log'); 



/**
 * @swagger
 * path: /api/encuestas/json
 * operations:
 *   -  httpMethod: GET
 *      summary: Devuelve el json para generar el formulario.
 *      notes: Regresa un json que contiene los datos necesario para generar el formulario.
 *      responseClass: encuestas
 *      nickname: encuestas
 *      consumes: 
 *        - text/html
 */


routes.get('/json', function(req, res){
    const path = require('path');
    var fs = require('fs');

    let reqPath = path.join(__dirname, '../../public/registroPersonas.json');

    fs.readFile(reqPath , 'utf8', function (err, data) {
        if(!err){
            
            var jsonObj = JSON.parse(JSON.stringify(data));
            res.send( data );
        }
        else{
            res.send("Error: "+err )
        }
    });
});

module.exports = routes;