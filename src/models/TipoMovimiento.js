const mongoose = require('mongoose');

const tipoMovimientoSchema = mongoose.Schema({
    signo: { type: String, required: true },
    codigo: { type: String, required: true },
    nombre: { type: String, required: true },
    cajas: [
      {
        _id: { type: String, reqrired: true}
      }      
    ]
},
{
  timestamps: true
});

module.exports = mongoose.model('TipoMovimiento', tipoMovimientoSchema);