const indexView = require('./Vistas'); 

module.exports = function(app, dbservice) {
    app.get('/', (req, res) => {
        res.send(indexView());
    });
    
    app.get('/Tipo_de_cuenta', (req, res) => {
        dbservice.gettipo_de_cuenta()
            .then(Tipocuenta => res.json(Tipocuenta))
            .catch(e => res.status(500).send(e));
    });
};