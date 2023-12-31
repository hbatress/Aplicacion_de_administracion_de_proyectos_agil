const { body, validationResult } = require('express-validator');

module.exports = function (app, dbservice) {
    app.get('/', (req, res) => {

        res.json({ "Mensaje": "Todo bien" });
    });

    // los get para leer informacion
    app.get('/login', (req, res) => {
        dbservice.getUsuario()
            .then(usuarios => res.json(usuarios))
            .catch(error => res.status(500).send(error));
    });

    app.get('/usuario/:id', (req, res) => {
        const usuarioId = req.params.id;
        dbservice.getUsuarioPorIdConTipoCuenta(usuarioId)
            .then((usuario) => {
                if (usuario) {
                    delete usuario.contrasenia;
                    res.json(usuario);
                } else {
                    res.status(404).json({ error: 'Usuario no encontrado' });
                }
            })
            .catch((error) => {
                res.status(500).json({ error: 'Error al buscar el usuario' });
            });
    });


    /*Sirve para leer los proyectos que tiene el usuario  */
    app.get('/proyectos/:id', (req, res) => {
        const usuarioId = req.params.id;

        dbservice.getProyectosAsignados(usuarioId)
            .then((proyectos) => {
                if (proyectos && proyectos.length > 0) {
                    res.json(proyectos);
                } else {
                    res.status(404).json({ error: 'No se encontraron proyectos asignados a este usuario' });
                }
            })
            .catch((error) => {
                res.status(500).json({ error: 'Error al buscar los proyectos asignados' });
            });
    });

    /* Sirve para ver las tareas de un usuario específico */
    app.get('/tareas/:id', (req, res) => {
        const usuarioId = req.params.id;

        dbservice.getTareasAsignadas(usuarioId)
            .then((tareas) => {
                if (tareas && tareas.length > 0) {
                    res.json(tareas);
                } else {
                    res.status(404).json({ error: 'No se encontraron tareas asignadas a este usuario' });
                }
            })
            .catch((error) => {
                res.status(500).json({ error: 'Error al buscar las tareas asignadas' });
            });
    });


    /* Ruta para ver las tareas de un usuario específico con información adicional */
    app.get('/infohistoria/:id', (req, res) => {
        const usuarioId = req.params.id;

        // Utiliza la función de consulta de Knex
        dbservice.getColaboradorYProyectoPorTarea(usuarioId)
            .then((result) => {
                if (result && result.length > 0) {
                    res.json(result);
                } else {
                    res.status(404).json({ error: 'No se encontraron tareas asignadas a este usuario' });
                }
            })
            .catch((error) => {
                res.status(500).json({ error: 'Error al buscar las tareas asignadas' });
            });
    });
/*Ruta para treaer el estado de la tarea */
    app.get('/EstadosPromedio/:id', (req, res) => {
        const usuarioId = req.params.id;
        console.log('Valor de usuarioId:', usuarioId);
    
        dbservice.EstadosPromedio(usuarioId)
            .then((proyectos) => {
                if (proyectos.length > 0) {
                    res.json(proyectos);
                } else {
                    res.status(404).json({ error: 'No se encontraron proyectos y estados promedio para este usuario' });
                }
            })
            .catch((error) => {
                res.status(500).json({ error: 'Error al obtener proyectos y estados promedio' });
            });
    });
    
    app.get('/CuentaTI/:id', (req, res) => {
        const usuarioId = req.params.id;
        console.log('Valor de usuarioId:', usuarioId);
        dbservice.getBuscarUsuarioPorId(usuarioId)
            .then((usuario) => {
                if (usuario) {
                    res.json(usuario);
                } else {
                    res.status(404).json({ error: 'Usuario no encontrado' });
                }
            })
            .catch((error) => {
                res.status(500).json({ error: 'Error al leer el usuario' });
            });
    });

    //esto nos permitira buscar el proyecto que tiene asignado por el nombre



    //estos son los post para agregar los datos
    app.post('/AddUser', (req, res) => {
        const newUser = req.body;
        dbservice
            .crearUsuario(
                newUser.Nombre,
                newUser.Correo_Electronico,
                newUser.Rol,
                newUser.Fecha_de_Registro,
                newUser.Tipo_de_Cuenta,
                newUser.Contrasenia
            )
            .then(() => {
                res.json({ message: "Agregado con éxito" });
            })
            .catch(e => {
                res.status(500).send(e);
            });
    });

    app.post('/tareas', [
        // Validación de inyección de código malicioso en el nombre y la descripción de la tarea
        body('Nombre_de_la_Tarea').matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s]*$/).withMessage('Caracteres no permitidos en el nombre de la tarea'),
        body('Descripcion').matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s]*$/).withMessage('Caracteres no permitidos en la descripción de la tarea'),

    ], (req, res) => {
        // Comprobación de errores de validación
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newTask = req.body;
        dbservice.crearTarea(
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
                newMovementHistory.Proyecto_Perteneciente,
                newMovementHistory.Usuario_que_Realizo_el_Movimiento,
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

    /* put para actualizar*/
    app.put('/UPdatauser/:id', (req, res) => {
        const usuarioId = req.params.id;
        const updateUser = req.body;

        // Excluye 'Fecha_de_Registro' y 'ID' de los datos a actualizar
        const { Fecha_de_Registro, ID, ...userData } = updateUser;

        console.log('Usuario ID:', usuarioId);
        console.log('Datos actualizados:', userData);

        dbservice.actualizarUsuario(usuarioId, userData)
            .then(() => {
                res.json({ message: 'Usuario actualizado con éxito' });
            })
            .catch((error) => {
                res.status(500).json({ error: 'Error al actualizar el usuario' });
            });
    });

    /* Ruta PUT para actualizar el estado de una tarea */
    app.put('/updateTareaEstado/:id', (req, res) => {
        const tareaId = req.params.id;
        const nuevoEstadoId = req.body.Estado_de_la_Tarea; // Suponiendo que el nuevo estado se proporciona en el cuerpo de la solicitud

        dbservice.actualizarEstadoTarea(tareaId, nuevoEstadoId)
            .then(() => {
                res.json({ message: 'Estado de la tarea actualizado con éxito' });
            })
            .catch((error) => {
                res.status(500).json({ error: 'Error al actualizar el estado de la tarea' });
            });
    });


    /* Creacion de la ruta para la creacion de proyectos */
    app.post('/proyectos', [
        // Validación de inyección de código malicioso en el título y la descripción
        body('Nombre_del_Proyecto').matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s]*$/).withMessage('Caracteres no permitidos en el título'),
        body('Descripcion').matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s]*$/).withMessage('Caracteres no permitidos en la descripción'),

    ], (req, res) => {
        // Comprobación de errores de validación
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newProject = req.body;
        dbservice.crearProyectos(
            newProject.Nombre_del_Proyecto,
            newProject.Descripcion,
            newProject.Fecha_de_Creacion,
            newProject.Usuario_Propietario
        )
            .then(() => {
                res.json({ message: "Proyecto agregado con éxito" });
            })
            .catch(e => {
                res.status(500).send(e);
            });
    });

    /*Codigo para actualizar los datos del proyecto */
    app.put('/updateproject/:id', (req, res) => {
        const proyectoId = req.params.id;
        const { Nombre_del_Proyecto, Descripcion } = req.body; // Obtener Nombre_del_Proyecto y Descripcion desde el cuerpo de la solicitud

        console.log('Proyecto ID:', proyectoId);
        console.log('Nombre del Proyecto:', Nombre_del_Proyecto);
        console.log('Descripción:', Descripcion);

        // Asegúrate de que se pasen los campos Nombre_del_Proyecto y Descripcion a la función de actualización en el servicio.
        dbservice.actualizarNombreYDescripcionProyecto(proyectoId, Nombre_del_Proyecto, Descripcion)
            .then(() => {
                res.json({ message: 'Proyecto actualizado con éxito' });
            })
            .catch((error) => {
                res.status(500).json({ error: 'Error al actualizar el proyecto' });
            });
    });

    // Ruta para obtener información del historial de movimientos relacionado a un usuario
    app.get('/infotareas/:nombreTarea/:usuarioId', (req, res) => {
        const nombreTarea = req.params.nombreTarea;
        const usuarioId = req.params.usuarioId;

        // Utiliza la función de consulta de Knex
        dbservice.getTareasPorNombreYUsuario(nombreTarea, usuarioId)
            .then((tareas) => {
                if (tareas && tareas.length > 0) {
                    res.json(tareas);
                } else {
                    res.status(404).json({ error: 'No se encontraron tareas con el nombre especificado para este usuario' });
                }
            })
            .catch((error) => {
                res.status(500).json({ error: 'Error al buscar las tareas asignadas' });
            });
    });


    /*Funcionpara realizar llamado a los proyectos que cuenta el usuario */
    app.get('/informaciontareas/:usuarioId', (req, res) => {
        const usuarioId = req.params.usuarioId;

        dbservice.getColaboradoresYTareasPorUsuarioPropietario(usuarioId)
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                res.status(500).json({ error: 'Error al buscar la información de tareas y colaboradores' });
            });
    });


    app.put('/updatetask/:id', (req, res) => {
        const tareaId = req.params.id;
        const { Nombre_de_la_Tarea, Descripcion, Estado_de_la_Tarea } = req.body;

        // Asegúrate de que se pasen los campos necesarios a la función de actualización en el servicio.
        dbservice.actualizarTarea(tareaId, Nombre_de_la_Tarea, Descripcion, Estado_de_la_Tarea)
            .then(() => {
                res.json({ message: 'Tarea actualizada con éxito' });
            })
            .catch((error) => {
                res.status(500).json({ error: 'Error al actualizar la tarea' });
            });
    });

    /*Rutas para sin y con colaborador */
    app.get('/tareas-sin-colaborador/:id', (req, res) => {
        const usuarioPropietarioId = req.params.id;

        dbservice.Taressincolaborador(usuarioPropietarioId)
            .then((tareas) => {
                if (tareas && tareas.length > 0) {
                    res.json(tareas);
                } else {
                    res.status(404).json({ error: 'No se encontraron tareas sin colaborador para este usuario propietario' });
                }
            })
            .catch((error) => {
                res.status(500).json({ error: 'Error al buscar las tareas sin colaborador' });
            });
    });

    app.get('/tareas-con-colaborador/:id', (req, res) => {
        const usuarioPropietarioId = req.params.id;

        dbservice.taresconcolaborador(usuarioPropietarioId)
            .then((tareas) => {
                if (tareas && tareas.length > 0) {
                    res.json(tareas);
                } else {
                    res.status(404).json({ error: 'No se encontraron tareas con colaborador para este usuario propietario' });
                }
            })
            .catch((error) => {
                res.status(500).json({ error: 'Error al buscar las tareas con colaborador' });
            });
    });



    app.delete('/eliminar-proyecto/:proyectoId', (req, res) => {
        const proyectoIdAEliminar = req.params.proyectoId; // Obtén el ID del proyecto desde los parámetros de la URL

        dbservice.eliminarProyectoPorId(proyectoIdAEliminar)
            .then(() => {
                res.status(204).send(); // Éxito, no hay contenido en la respuesta
            })
            .catch((error) => {
                res.status(500).json({ error: 'Error al eliminar el proyecto', message: error.message });
            });
    });


    app.get('/tareanoColaborador/:id', (req, res) => {
        const usuarioPropietarioId = req.params.id;
        const estadoEnProcesoDeEsperaId = 1;

        dbservice.Proyectosincolaborador(usuarioPropietarioId, estadoEnProcesoDeEsperaId)
            .then((tareas) => {
                if (tareas && tareas.length > 0) {
                    res.json(tareas);
                } else {
                    res.status(404).json({ error: 'No se encontraron tareas con colaborador para este usuario propietario' });
                }
            })
            .catch((error) => {
                res.status(500).json({ error: 'Error al buscar las tareas con colaborador' });
            });
        });






    }
