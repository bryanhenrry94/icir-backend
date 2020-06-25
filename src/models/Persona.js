const mongoose = require('mongoose');

const personaSchema = mongoose.Schema({
    tipo_identificacion: { type: String, required: true },
    identificacion: { type: String, required: true },
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    direccion: { type: String },
    email: { type: String },
    telefono: { type: String }
},
{
  timestamps: true
});

module.exports = mongoose.model('Persona', personaSchema);