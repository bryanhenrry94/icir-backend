const mongoose = require('mongoose');

const cajaSchema = mongoose.Schema({  
    iglesia: {
      _id: { type: String, reqrired: true},
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
    responsable: {
      _id: { type: String, required: true },
      usuario: { type: String, required: true },
      contrasena: { type: String, required: true },
      nombre: { type: String, required: true },
      email: { type: String },
      perfil: { type: String, require: true }  
    },
    codigo: { type: String, required: true },
    nombre: { type: String, required: true },
    moneda: { type: String, required: true },
    estado: { type: Boolean, required: true }
},
{
  timestamps: true
});

module.exports = mongoose.model('Caja', cajaSchema);