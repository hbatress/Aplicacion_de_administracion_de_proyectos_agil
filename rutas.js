module.exports = function(app, dbservice) {
    app.get('/', (req, res) => {

        res.json({"Mensaje":"Todo bien"});
    });

    //los get para leer la informacion 
    app.get('/Usuario', (req, res) => {
        dbservice.getUsuario()
        .then(usuarios => res.json(usuarios))
        .catch(error => res.status(500).send(error));
    });
    
    app.get('/Tablero', (req, res) => {
        dbservice.getTablero()
        .then(tableros => res.json(tableros))
        .catch(error => res.status(500).send(error));
    });
    
    app.get('/Lista_de_Tarea', (req, res) => {
        dbservice.getListaDeTarea()
        .then(listas => res.json(listas))
        .catch(error => res.status(500).send(error));
    });
    
    app.get('/Tarjeta', (req, res) => {
        dbservice.getTarjeta()
        .then(tarjetas => res.json(tarjetas))
        .catch(error => res.status(500).send(error));
    });
    
    app.get('/Comentario', (req, res) => {
        dbservice.getComentario()
        .then(comentarios => res.json(comentarios))
        .catch(error => res.status(500).send(error));
    });
    
    app.get('/Etiqueta', (req, res) => {
        dbservice.getEtiqueta()
        .then(etiquetas => res.json(etiquetas))
        .catch(error => res.status(500).send(error));
    });
    
    app.get('/Historial_de_Movimiento', (req, res) => {
        dbservice.getHistorialDeMovimiento()
        .then(historiales => res.json(historiales))
        .catch(error => res.status(500).send(error));
    });
    
    app.get('/Tipo_de_Movimiento', (req, res) => {
        dbservice.getTipoDeMovimiento()
        .then(tipos => res.json(tipos))
        .catch(error => res.status(500).send(error));
    });
    
    app.get('/Tipo_de_Cuenta', (req, res) => {
        dbservice.getTipoDeCuenta()
        .then(cuentas => res.json(cuentas))
        .catch(error => res.status(500).send(error));
    });
    
    app.get('/Tipo_de_Pago', (req, res) => {
        dbservice.getTipoDePago()
        .then(pagos => res.json(pagos))
        .catch(error => res.status(500).send(error));
    });
    
    app.get('/Estado_de_la_Tarjeta', (req, res) => {
        dbservice.getEstadoDeLaTarjeta()
        .then(estados => res.json(estados))
        .catch(error => res.status(500).send(error));
    });
    
    app.get('/Participante', (req, res) => {
        dbservice.getParticipante()
        .then(participantes => res.json(participantes))
        .catch(error => res.status(500).send(error));
    });
    
    app.get('/Datos_de_Tarjeta', (req, res) => {
        dbservice.getDatosDeTarjeta()
        .then(datos => res.json(datos))
        .catch(error => res.status(500).send(error));
    });
};