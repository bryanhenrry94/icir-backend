const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    value: { type: String, required: true },
    name: { type: String, required: true }
},
{
  timestamps: true
});

module.exports = mongoose.model('Role', roleSchema);