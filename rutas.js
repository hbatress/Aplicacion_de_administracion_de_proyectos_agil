module.exports = function(app, dbservice) {

    app.get('/Tipo_de_cuenta', (req, res) => {
        dbservice.gettipo_de_cuenta()
            .then(lenguajes => res.json(lenguajes))
            .catch(e => res.status(500).send(e));
    });
};