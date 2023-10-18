require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const { dbservice } = require('./Codigo de Base de datos/dbservice');

const app = express();

app.use(bodyParser.json());

const dbService = dbservice();
require('./rutas')(app, dbService);

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});