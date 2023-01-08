const express = require('express');
const bodyParser  = require('body-parser');
const app = express();
const routes = require('./src/routes/index');
const cors = require('cors');
require('./src/database');

// sets port 3000 to default or unless otherwise specified in the environment
app.set('port', process.env.PORT || 3001);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(app.get('port'));
console.log('Server on port ', app.get('port'));