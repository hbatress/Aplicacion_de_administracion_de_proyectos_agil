module.exports = function (app, dbservice) {
    app.get('/', (req, res) => {

        res.json({ "Mensaje": "Todo bien" });
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

    //estos son los post para agregar los datos
    app.post('/usuarios', (req, res) => {
        const newUser = req.body;
        databaseSer
            .crearUsuario(
                newUser.Nombre,
                newUser.Correo_Electronico,
                newUser.Rol,
                newUser.Fecha_de_Registro,
                newUser.Tipo_de_Cuenta,
                newUser.Tipo_de_Pago
            )
            .then(() => {
                res.json({ message: "Agregado con éxito" });
            })
            .catch(e => {
                res.status(500).send(e);
            });
    });


    app.post('/tableros', (req, res) => {
        const newTablero = req.body;
        databaseSer
            .crearTablero(
                newTablero.Nombre_del_Tablero,
                newTablero.Descripcion,
                newTablero.Fecha_de_Creacion,
                newTablero.Usuario_Propietario
            )
            .then(() => {
                res.json({ message: "Agregado con éxito" });
            })
            .catch(e => {
                res.status(500).send(e);
            });
    });


    app.post('/listas', (req, res) => {
        const newList = req.body;
        databaseSer
            .crearListaDeTarea(
                newList.Nombre_de_la_Lista,
                newList.Posicion_en_el_Tablero,
                newList.Tablero_Perteneciente
            )
            .then(() => {
                res.json({ message: "Agregado con éxito" });
            })
            .catch(e => {
                res.status(500).send(e);
            });
    });


    app.post('/tarjetas', (req, res) => {
        const newCard = req.body;
        databaseSer
            .crearTarjeta(
                newCard.Titulo_de_la_Tarjeta,
                newCard.Descripcion,
                newCard.Fecha_de_Creacion,
                newCard.Lista_Perteneciente,
                newCard.Asignado_a,
                newCard.Estado_de_la_Tarjeta
            )
            .then(() => {
                res.json({ message: "Agregado con éxito" });
            })
            .catch(e => {
                res.status(500).send(e);
            });
    });


    app.post('/comentarios', (req, res) => {
        const newComment = req.body;
        databaseSer
            .crearComentario(
                newComment.Texto_del_Comentario,
                newComment.Fecha_de_Publicacion,
                newComment.Usuario_que_Realizo_el_Comentario,
                newComment.Tarjeta_que_se_Refiere
            )
            .then(() => {
                res.json({ message: "Agregado con éxito" });
            })
            .catch(e => {
                res.status(500).send(e);
            });
    });


    app.post('/etiquetas', (req, res) => {
        const newTag = req.body;
        databaseSer
            .crearEtiqueta(
                newTag.Nombre_de_la_Etiqueta,
                newTag.Color_de_la_Etiqueta
            )
            .then(() => {
                res.json({ message: "Agregado con éxito" });
            })
            .catch(e => {
                res.status(500).send(e);
            });
    });


    app.post('/historiales', (req, res) => {
        const newHistory = req.body;
        databaseSer
            .crearHistorialDeMovimiento(
                newHistory.Fecha_y_Hora_del_Movimiento,
                newHistory.Usuario_que_Realizo_el_Movimiento,
                newHistory.Tipo_de_Movimiento,
                newHistory.Tarjeta_Afectada
            )
            .then(() => {
                res.json({ message: "Agregado con éxito" });
            })
            .catch(e => {
                res.status(500).send(e);
            });
    });


    app.post('/tiposdemovimiento', (req, res) => {
        const newTipoMovimiento = req.body;
        databaseSer
            .crearTipoDeMovimiento(
                newTipoMovimiento.Nombre_del_Tipo_de_Movimiento,
                newTipoMovimiento.Descripcion_del_Tipo_de_Movimiento
            )
            .then(() => {
                res.json({ message: "Agregado con éxito" });
            })
            .catch(e => {
                res.status(500).send(e);
            });
    });


    app.post('/tiposdecuenta', (req, res) => {
        const newTipoCuenta = req.body;
        databaseSer
            .crearTipoDeCuenta(
                newTipoCuenta.Nombre_del_Tipo_de_Cuenta,
                newTipoCuenta.Descripcion_del_Tipo_de_Cuenta
            )
            .then(() => {
                res.json({ message: "Agregado con éxito" });
            })
            .catch(e => {
                res.status(500).send(e);
            });
    });


    app.post('/tiposdepago', (req, res) => {
        const newTipoPago = req.body;
        databaseSer
            .crearTipoDePago(
                newTipoPago.Nombre_del_Tipo_de_Pago,
                newTipoPago.Descripcion_del_Tipo_de_Pago
            )
            .then(() => {
                res.json({ message: "Agregado con éxito" });
            })
            .catch(e => {
                res.status(500).send(e);
            });
    });


    app.post('/estadosdetarjeta', (req, res) => {
        const newEstadoTarjeta = req.body;
        databaseSer
            .crearEstadoDeLaTarjeta(
                newEstadoTarjeta.Nombre_del_Estado,
                newEstadoTarjeta.Descripcion_del_Estado
            )
            .then(() => {
                res.json({ message: "Agregado con éxito" });
            })
            .catch(e => {
                res.status(500).send(e);
            });
    });


    app.post('/participantes', (req, res) => {
        const newParticipante = req.body;
        databaseSer
            .crearParticipante(
                newParticipante.Usuario_Participante,
                newParticipante.Tarjeta_asociada
            )
            .then(() => {
                res.json({ message: "Agregado con éxito" });
            })
            .catch(e => {
                res.status(500).send(e);
            });
    });


    app.post('/datosdetarjeta', (req, res) => {
        const newDatosTarjeta = req.body;
        databaseSer
            .crearDatosDeTarjeta(
                newDatosTarjeta.Numero_de_Tarjeta,
                newDatosTarjeta.Mes_de_Vencimiento,
                newDatosTarjeta.Ano_de_Vencimiento,
                newDatosTarjeta.Codigo_de_Seguridad,
                newDatosTarjeta.Tipo_de_Pago
            )
            .then(() => {
                res.json({ message: "Agregado con éxito" });
            })
            .catch(e => {
                res.status(500).send(e);
            });
    });


};