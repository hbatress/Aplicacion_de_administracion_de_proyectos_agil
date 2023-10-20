require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const { dbservice } = require('./Codigo de Base de datos/dbservice');
const nuevasRutas = require('./nuevasRutas');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

const dbService = dbservice();
require('./rutas')(app, dbService);
app.use('/nuevasRutas', nuevasRutas);

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});
