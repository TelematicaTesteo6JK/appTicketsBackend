const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeccionSchema = new Schema({
    id: {
        type: Number
    },
    entidad:{
        type:String
    },
    distrito:{
        type: String,
    },
    municipio:{
        type: String,
    },
    seccion:{
        type: String,
    },
    tipo:{
        type: Number,
    },
    control:{
        type: Number,
    },
    geometry:{
        tipo:{
            type: String,
            default: 'Polygon'
        } ,
        points: {
            type: []
        }
    }
});

const Seccion = mongoose.model('seccion', SeccionSchema);

module.exports = Seccion;
