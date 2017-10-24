const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CasillasSchema = new Schema({
    entidad:{
        type: String
    },
    seccion:{
        type: String
    },
    localidad:{
        type: String
    },
    manzana:{
        type: Number
    },
    casilla:{
        type: String,
    },
    domicilio:{
        type: String,
    },
    ubicacion:{
        type: String,
    },
    referencia:{
        type: String,
    },
    geometry:{
        tipo:{
            type: String,
            default: 'Point'
        },
        point:{
            lat:{
                type: Number
            },
            lng:{
                type: Number
            }
        }
    }
});

const Casilla = mongoose.model('casilla', CasillasSchema);

module.exports = Casilla;
