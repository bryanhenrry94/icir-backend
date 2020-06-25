const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
  usuario: { type: String, required: true },
  contrasena: { type: String, required: true },
  nombre: { type: String, required: true },
  email: { type: String },
  perfil: { type: String, require: true }  
},
{
  timestamps: true
});

module.exports = mongoose.model('Usuario', usuarioSchema);