require('dotenv').config()

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { dbservice } = require('./Codigo de Base de datos/dbservice');
const rutas = require('./rutas');

const app = express();
app.use(cors({
    origin: 'http://127.0.0.1:5500',
}));
app.use(bodyParser.json());

const dbService = dbservice();
rutas(app, dbService);

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});
