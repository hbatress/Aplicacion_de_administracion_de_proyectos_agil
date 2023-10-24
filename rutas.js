module.exports = function (app, dbservice) {
    app.get('/', (req, res) => {

        res.json({ "Mensaje": "Todo bien" });
    });

    // Rutas para leer la información
    app.get('/Usuario', (req, res) => {
        dbservice.getUsuario()
            .then(usuarios => res.json(usuarios))
            .catch(error => res.status(500).send(error));
    });

    app.get('/Proyectos', (req, res) => {
        dbservice.getProyectos()
            .then(proyectos => res.json(proyectos))
            .catch(error => res.status(500).send(error));
    });

    app.get('/Tarea', (req, res) => {
        dbservice.getTarea()
            .then(tareas => res.json(tareas))
            .catch(error => res.status(500).send(error));
    });

    app.get('/Colaborador', (req, res) => {
        dbservice.getColaborador()
            .then(colaboradores => res.json(colaboradores))
            .catch(error => res.status(500).send(error));
    });

    app.get('/Notificacion', (req, res) => {
        dbservice.getNotificacion()
            .then(notificaciones => res.json(notificaciones))
            .catch(error => res.status(500).send(error));
    });

    app.get('/Historial_de_Movimiento', (req, res) => {
        dbservice.getHistorialDeMovimiento()
            .then(historiales => res.json(historiales))
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

    app.get('/Estado_de_la_Tarea', (req, res) => {
        dbservice.getEstadoDeLaTarea()
            .then(estados => res.json(estados))
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
        dbservice
            .crearUsuario(
                newUser.Nombre,
                newUser.Correo_Electronico,
                newUser.Rol,
                newUser.Fecha_de_Registro,
                newUser.Tipo_de_Cuenta,
                newUser.Tipo_de_Pago,
                newUser.Contrasenia
            )
            .then(() => {
                res.json({ message: "Agregado con éxito" });
            })
            .catch(e => {
                res.status(500).send(e);
            });
    });

    app.post('/tareas', (req, res) => {
        const newTask = req.body;
        dbservice
            .crearTarea(
                newTask.Nombre_de_la_Tarea,
                newTask.Descripcion,
                newTask.Fecha_de_Creacion,
                newTask.Proyecto_Perteneciente,
                newTask.Estado_de_la_Tarea
            )
            .then(() => {
                res.json({ message: "Tarea agregada con éxito" });
            })
            .catch(e => {
                res.status(500).send(e);
            });
    });
    app.post('/colaboradores', (req, res) => {
        const newCollaborator = req.body;
        dbservice
            .crearColaborador(
                newCollaborator.Usuario_Participante,
                newCollaborator.Proyecto_Perteneciente,
                newCollaborator.Tarea_Asignada
            )
            .then(() => {
                res.json({ message: "Colaborador agregado con éxito" });
            })
            .catch(e => {
                res.status(500).send(e);
            });
    });

    app.post('/notificaciones', (req, res) => {
        const newNotification = req.body;
        dbservice
            .crearNotificacion(
                newNotification.Titulo_de_la_Notificacion,
                newNotification.Descripcion,
                newNotification.Usuario
            )
            .then(() => {
                res.json({ message: "Notificación agregada con éxito" });
            })
            .catch(e => {
                res.status(500).send(e);
            });
    });

    app.post('/historialesmovimiento', (req, res) => {
        const newMovementHistory = req.body;
        dbservice
            .crearHistorialDeMovimiento(
                newMovementHistory.Fecha_y_Hora_del_Movimiento,
                newMovementHistory.Usuario_que_Realizo_el_Movimiento,
                newMovementHistory.Tipo_de_Movimiento,
                newMovementHistory.Estado_de_la_Tarea,
                newMovementHistory.Tarea
            )
            .then(() => {
                res.json({ message: "Historial de movimiento agregado con éxito" });
            })
            .catch(e => {
                res.status(500).send(e);
            });
    });

    app.post('/tiposdecuenta', (req, res) => {
        const newAccountType = req.body;
        dbservice
            .crearTipoDeCuenta(
                newAccountType.Nombre_del_Tipo_de_Cuenta,
                newAccountType.Descripcion_del_Tipo_de_Cuenta
            )
            .then(() => {
                res.json({ message: "Tipo de cuenta agregado con éxito" });
            })
            .catch(e => {
                res.status(500).send(e);
            });
    });

    app.post('/tiposdepago', (req, res) => {
        const newPaymentType = req.body;
        dbservice
            .crearTipoDePago(
                newPaymentType.Nombre_del_Tipo_de_Pago,
                newPaymentType.Descripcion_del_Tipo_de_Pago
            )
            .then(() => {
                res.json({ message: "Tipo de pago agregado con éxito" });
            })
            .catch(e => {
                res.status(500).send(e);
            });
    });

    app.post('/estadosdetarea', (req, res) => {
        const newTaskState = req.body;
        dbservice
            .crearEstadoDeLaTarea(
                newTaskState.Nombre_del_Estado,
                newTaskState.Descripcion_del_Estado
            )
            .then(() => {
                res.json({ message: "Estado de la tarea agregado con éxito" });
            })
            .catch(e => {
                res.status(500).send(e);
            });
    });
    app.post('/datosdetarjeta', (req, res) => {
        const newCardData = req.body;
        dbservice
            .crearDatosDeTarjeta(
                newCardData.Numero_de_Tarjeta,
                newCardData.Mes_de_Vencimiento,
                newCardData.Ano_de_Vencimiento,
                newCardData.Codigo_de_Seguridad,
                newCardData.Tipo_de_Pago
            )
            .then(() => {
                res.json({ message: "Datos de tarjeta agregados con éxito" });
            })
            .catch(e => {
                res.status(500).send(e);
            });
    });
    app.post('/tiposdecuenta', (req, res) => {
        const newAccountType = req.body;
        dbservice
            .crearTipoDeCuenta(
                newAccountType.Nombre_del_Tipo_de_Cuenta,
                newAccountType.Descripcion_del_Tipo_de_Cuenta
            )
            .then(() => {
                res.json({ message: "Tipo de cuenta agregado con éxito" });
            })
            .catch(e => {
                res.status(500).send(e);
            });
    });
    

}