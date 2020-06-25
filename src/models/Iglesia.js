const mongoose = require('mongoose');

const iglesiaSchema = mongoose.Schema({  
  nombre: { type: String, require: true} ,
  codigo: { type: Number, require: true} ,
  direccion: { type: String, require: true} ,
  codigo_postal: { type: Number, require: true} ,
  fecha_creacion: { type: Date, require: true} ,
  pastor: { type: String, require: true} ,
  email: { type: String, require: true} ,
  telefono: { type: String } ,
  whatsapp: { type: String } ,
  website: { type: String } ,
  facebook: { type: String } 
},
{
  timestamps: true
});

module.exports = mongoose.model('Iglesia', iglesiaSchema);