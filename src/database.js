const mongoose = require('mongoose');

const _URI = 'mongodb://admin:admin@cluster0-shard-00-00-yzt5m.mongodb.net:27017,cluster0-shard-00-01-yzt5m.mongodb.net:27017,cluster0-shard-00-02-yzt5m.mongodb.net:27017/icir?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
const _URI_LOCAL = 'mongodb://localhost:27017/icir';

mongoose.connect(_URI, {
}).then(db => console.log('Database in connected'))
.catch(err => console.log(err));