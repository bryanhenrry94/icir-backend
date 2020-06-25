const express = require('express');
const bodyParser  = require('body-parser');
const app = express();
const routes = require('./routes/index');
const cors = require('cors');
require('./database');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(3700);
console.log('Server on port ', 3700);