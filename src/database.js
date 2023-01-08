const mongoose = require('mongoose');

const _URI = 'mongodb://bryanhenrry94:M1n0T4ur0@ac-j1k3x5l-shard-00-00.eyhqdjg.mongodb.net:27017,ac-j1k3x5l-shard-00-01.eyhqdjg.mongodb.net:27017,ac-j1k3x5l-shard-00-02.eyhqdjg.mongodb.net:27017/?ssl=true&replicaSet=atlas-23w6cm-shard-0&authSource=admin&retryWrites=true&w=majority';
// const _URI = 'mongodb+srv://bryanhenrry94:M1n0T4ur0@cluster0.eyhqdjg.mongodb.net/icir_db'

mongoose.connect(_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(db => console.log('Database in connected'))
.catch(err => console.log(err));