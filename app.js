require('dotenv').config()

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { dbservice } = require('./Codigo de Base de datos/dbservice');

const app = express();
app.use(cors({
    origin: 'http://127.0.0.1:5500',
}));
app.use(bodyParser.json());

const dbService = dbservice();
require('./rutas')(app, dbService);

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});

app.get('/usuario/:id', (req, res) => {
    const usuarioId = req.params.id;
    
    // Utiliza Knex.js para consultar la base de datos
    db.select()
      .from('usuario') // Reemplaza 'usuario' con el nombre de tu tabla
      .where({ ID: usuarioId })
      .then((usuarios) => {
        if (usuarios.length > 0) {
          res.json(usuarios[0]);
        } else {
          res.status(404).json({ error: 'Usuario no encontrado' });
        }
      })
      .catch(error => {
        res.status(500).json({ error: 'Error en la consulta de la base de datos' });
      });
  });
  