const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const personSchema = new Schema({},{strict:false});

const PersonaSchema = new Schema({
    created: {
        type: Date,
        default: Date.now 
    },
    modificated: {
        type: Date,
        default: Date.now
    },
    status:{
        type: String,
        default : 'No validado'
    },
    json_version:{
        type: Number,
        required: [ true, 'Json version field is required']
    },
    persona:{
        type : personSchema,
        required: [true, 'The json file is required']
    },
    event:{
        type : Number,
        default: null
    },
    origin:{
        type : Number,
        default: null
    },
    padre: {
        type : Number,
        default: null
    }
});

const Persona = mongoose.model('persona', PersonaSchema);

module.exports = Persona;