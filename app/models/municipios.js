const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MunicipioSchema = new Schema({
    id: {
        type: Number
    },
    entidad:{
        type:String
    },
    municipio:{
        type: String,
    },
    nombre:{
        type: String,
    },
    control:{
        type: Number,
    },
    geometry:{
        tipo:{
            type: String,
            default: 'Polygon'
        },
        points:{
            type: []
        }
    }
});

const Municipio = mongoose.model('municipio', MunicipioSchema);

module.exports = Municipio;
