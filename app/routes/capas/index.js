/**
 * @swagger
 * resourcePath: /capas
 * description: Métodos para el tratamiento de capas geográficas.
 */

const routes = require('express').Router();
const fs = require('fs');
const geojson = require('kml-placemarks-to-geojson');
const logger = require('logger').createLogger('./logs/development.log'); 
const tj = require('togeojson');
const DOMParser = require('xmldom').DOMParser;
const Municipio = require('../../models/municipios');
const Seccion = require('../../models/secciones');
const Casilla = require('../../models/casillas');


routes.get('/municipios', function(req, res, next){
    var filename = process.cwd() + '/public/kmlFiles/municipal.kml';
    var contentFile = fs.readFileSync(filename, 'utf8');
    var dom = (new DOMParser()).parseFromString(contentFile, 'text/xml');
    var converted = tj.kml(dom);
    converted.features.forEach(function(valor, index){
        let mpo = new Municipio({
            id: valor.properties.ID,
            entidad: zeroFill(valor.properties.ENTIDAD,2),
            municipio: zeroFill(valor.properties.MUNICIPIO,3),
            nombre: valor.properties.NOMBRE,
            control: valor.properties.CONTROL,
        });

        let puntos = new Array();
        valor.geometry.coordinates[0].forEach(function(val, index){
            let punto = {
                lat: val[0],
                lng: val[1]
            }
            puntos.push(punto);
        });

        mpo.geometry.points = puntos;

        Municipio.create(mpo).then(function(mpo){
            console.log(mpo);
        }).catch(next);
    });
    res.send({msg: 'Proceso Terminado'})
});

routes.get('/secciones', function(req, res, next){
    var filename = process.cwd() + '/public/kmlFiles/secciones.kml';
    var contentFile = fs.readFileSync(filename, 'utf8');
    var dom = (new DOMParser()).parseFromString(contentFile, 'text/xml');
    var converted = tj.kml(dom);
    //res.send(converted.features[3]);

    converted.features.forEach(function(valor, index){
        let seccion = new Seccion({
            id: valor.properties.ID,
            entidad: zeroFill(valor.properties.ENTIDAD,2),
            distrito: zeroFill(valor.properties.DISTRITO,3),
            municipio: zeroFill(valor.properties.MUNICIPIO,3),
            seccion: zeroFill(valor.properties.SECCION,4),
            tipo: valor.properties.TIPO,
            control: valor.properties.CONTROL,
        });

        let puntos = new Array();

        valor.geometry.coordinates.forEach(function(arr, index){
            arr.forEach(function(val,index){
                let punto = {
                    lat: val[0],
                    lng: val[1]
                }
                puntos.push(punto);
            });
        });

        seccion.geometry.points = puntos;

        Seccion.create(seccion).then(function(seccion){
            console.log(seccion);
        }).catch(next);
    });

    res.send({msg: 'Proceso Terminado'})
});

routes.get('/casillas', function(req, res, next){
    var filename = process.cwd() + '/public/kmlFiles/casillas.kml';
    var contentFile = fs.readFileSync(filename, 'utf8');
    var dom = (new DOMParser()).parseFromString(contentFile, 'text/xml');
    var converted = tj.kml(dom);
    converted.features.forEach(function(valor, index){
        let casilla = new Casilla({
            entidad: zeroFill(valor.properties.ENTIDAD,2),
            seccion: zeroFill(valor.properties.SECCION, 4),
            localidad: zeroFill(valor.properties.LOCALIDAD, 3),
            manzana: valor.properties.MANZANA,
            casilla: valor.properties.CASILLA,
            domicilio: valor.properties.DOMICILIO,
            ubicacion: valor.properties.UBICACION,
            referencia: valor.properties.REFERENCIA
        });

        let punto = {
                    lat: valor.geometry.coordinates[0],
                    lng: valor.geometry.coordinates[1]
                }

        casilla.geometry.point = punto;

        Casilla.create(casilla).then(function(casilla){
            console.log(casilla);
        }).catch(next);
    });
    res.send({msg: 'Proceso Terminado'})
});

function zeroFill( number, width ){
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + "";
}

module.exports = routes;

