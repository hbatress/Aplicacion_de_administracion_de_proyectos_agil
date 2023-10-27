const dbservice = () => {
    const knex = require("knex")({
        client: "mysql",
        connection: {
            host: process.env.DB_HOST,
            port: 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB,
        },
    });
    // Declaraciones de constantes
    const Usuario = "Usuario";
    const Proyectos = "Proyectos";
    const Tarea = "Tarea";
    const Colaborador = "Colaborador";
    const Notificacion = "Notificacion";
    const HistorialDeMovimiento = "Historial_de_Movimiento";
    const TipoDeCuenta = "Tipo_de_Cuenta";
    const EstadoDeLaTarea = "Estado_de_la_Tarea";

    // Funciones de consulta
    const getUsuario = () => {
        return knex(Usuario).select();
    };

    // Funciones de  agregar
    const crearUsuario = (
        Nombre,
        Correo_Electronico,
        Rol,
        Fecha_de_Registro,
        Tipo_de_Cuenta,
        Contrasenia
    ) => {
        return knex(Usuario).insert({
            Nombre: Nombre,
            Correo_Electronico: Correo_Electronico,
            Rol: Rol,
            Fecha_de_Registro: Fecha_de_Registro,
            Tipo_de_Cuenta: Tipo_de_Cuenta,
            Contrasenia: Contrasenia,
        });
    };

    const crearProyectos = (
        Nombre_del_Proyecto,
        Descripcion,
        Fecha_de_Creacion,
        Usuario_Propietario
    ) => {
        return knex(Proyectos).insert({
            Nombre_del_Proyecto: Nombre_del_Proyecto,
            Descripcion: Descripcion,
            Fecha_de_Creacion: Fecha_de_Creacion,
            Usuario_Propietario: Usuario_Propietario,
        });
    };

    const crearTarea = (
        Nombre_de_la_Tarea,
        Descripcion,
        Fecha_de_Creacion,
        Proyecto_Perteneciente,
        Estado_de_la_Tarea
    ) => {
        return knex(Tarea).insert({
            Nombre_de_la_Tarea: Nombre_de_la_Tarea,
            Descripcion: Descripcion,
            Fecha_de_Creacion: Fecha_de_Creacion,
            Proyecto_Perteneciente: Proyecto_Perteneciente,
            Estado_de_la_Tarea: Estado_de_la_Tarea,
        });
    };

    const crearColaborador = (
        Usuario_Participante,
        Proyecto_Perteneciente,
        Tarea_Asiganda
    ) => {
        return knex(Colaborador).insert({
            Usuario_Participante: Usuario_Participante,
            Proyecto_Perteneciente: Proyecto_Perteneciente,
            Tarea_Asiganda: Tarea_Asiganda,
        });
    };

    const crearNotificacion = (
        Titulo_de_la_Notificacion,
        Descripcion,
        Usuario
    ) => {
        return knex(Notificacion).insert({
            Titulo_de_la_Notificacion: Titulo_de_la_Notificacion,
            Descripcion: Descripcion,
            Usuario: Usuario,
        });
    };

    const crearHistorialDeMovimiento = (
        Fecha_y_Hora_del_Movimiento,
        Proyecto_Perteneciente,
        Usuario_que_Realizo_el_Movimiento,
        Estado_de_la_Tarea,
        Tarea
    ) => {
        return knex("Historial_de_Movimiento").insert({
            Fecha_y_Hora_del_Movimiento: Fecha_y_Hora_del_Movimiento,
            Proyecto_Perteneciente: Proyecto_Perteneciente,
            Usuario_que_Realizo_el_Movimiento: Usuario_que_Realizo_el_Movimiento,
            Estado_de_la_Tarea: Estado_de_la_Tarea,
            Tarea: Tarea,
        });
    };

    const crearEstadoDeLaTarea = (Nombre_del_Estado, Descripcion_del_Estado) => {
        return knex(EstadoDeLaTarea).insert({
            Nombre_del_Estado: Nombre_del_Estado,
            Descripcion_del_Estado: Descripcion_del_Estado,
        });
    };

    const getUsuarioPorIdConTipoCuenta = (usuarioId) => {
        return knex("Usuario as U")
            .select(
                "U.ID as Usuario_ID",
                "U.Nombre as Nombre_Usuario",
                "U.Correo_Electronico",
                "U.Rol",
                "U.Fecha_de_Registro",
                "TC.Nombre_del_Tipo_de_Cuenta"
            )
            .leftJoin("Tipo_de_Cuenta as TC", "U.Tipo_de_Cuenta", "TC.ID")
            .where("U.ID", usuarioId)
            .first()
            .then((usuario) => {
                if (usuario) {
                    return usuario;
                } else {
                    throw new Error("Usuario no encontrado");
                }
            });
    };

    /* Sirve para actualizar los datos por medio del ID */
    const actualizarUsuario = (usuarioId, userData) => {
        return knex("Usuario") // Nombre de la tabla
            .where("ID", usuarioId)
            .update({
                Nombre: userData.Nombre,
                Correo_Electronico: userData.Correo_Electronico,
                Rol: userData.Rol,
                contrasenia: userData.contrasenia,
                Tipo_de_Cuenta: userData.Tipo_de_Cuenta,
                // Excluimos 'Fecha_de_Registro' y 'ID' de la actualización
            });
    };
    /* sive para actualiza el estado */
    const actualizarEstadoTarea = (tareaId, nuevoEstadoId) => {
        return knex("Tarea").where("ID", tareaId).update({
            Estado_de_la_Tarea: nuevoEstadoId,
        });
    };

    /* Sirve para buscar y unir tablas*/
    const getBuscarUsuarioPorId = (usuarioId) => {
        return knex("Usuario")
            .select(
                "Usuario.Nombre",
                "Tipo_de_Cuenta.Nombre_del_Tipo_de_Cuenta",
                "Tipo_de_Cuenta.Descripcion_del_Tipo_de_Cuenta"
            )
            .leftJoin("Tipo_de_Cuenta", "Usuario.Tipo_de_Cuenta", "Tipo_de_Cuenta.ID")
            .where("Usuario.ID", usuarioId)
            .first();
    };
    /*Buscar los proyectos que tiene asignados */
    const getProyectosAsignados = (usuarioId) => {
        return knex("Proyectos as p")
            .select(
                "p.ID",
                "p.Nombre_del_Proyecto",
                "p.Descripcion",
                "p.Fecha_de_Creacion"
            )
            .where("p.Usuario_Propietario", usuarioId);
    };
    /* Buscar las tareas asignadas a un usuario */
    const getTareasAsignadas = (usuarioId) => {
        return knex("Tarea as t")
            .select(
                "t.ID as Tarea_ID",
                "t.Nombre_de_la_Tarea",
                "t.Descripcion as Tarea_Descripcion",
                "t.Fecha_de_Creacion as Tarea_Fecha_de_Creacion",
                "p.ID as Proyecto_ID",
                "p.Nombre_del_Proyecto",
                "c.ID as Colaborador_ID",
                "e.Nombre_del_Estado as Estado_de_la_Tarea"
            )
            .innerJoin("Proyectos as p", "t.Proyecto_Perteneciente", "p.ID")
            .innerJoin("Estado_de_la_Tarea as e", "t.Estado_de_la_Tarea", "e.ID")
            .innerJoin("Colaborador as c", "t.ID", "c.Tarea_Asiganda")
            .where("c.Usuario_Participante", usuarioId);
    };

    const getColaboradorYProyectoPorTarea = (tareaId) => {
        return knex("Colaborador as c")
            .select(
                "c.ID as ID_Colaborador",
                "c.Proyecto_Perteneciente as ID_Proyecto"
            )
            .innerJoin("Tarea as t", "c.Tarea_Asiganda", "t.ID")
            .where("t.ID", tareaId);
    };

    const actualizarNombreYDescripcionProyecto = (
        proyectoId,
        nuevoNombre,
        nuevaDescripcion
    ) => {
        return knex("Proyectos").where("ID", proyectoId).update({
            Nombre_del_Proyecto: nuevoNombre,
            Descripcion: nuevaDescripcion,
        });
    };

    const actualizarTarea = (
        tareaId,
        nuevoNombre,
        nuevaDescripcion,
        nuevoEstado
    ) => {
        return knex("tarea").where("ID", tareaId).update({
            Nombre_de_la_Tarea: nuevoNombre,
            Descripcion: nuevaDescripcion,
            Estado_de_la_Tarea: nuevoEstado,
        });
    };
    /* Hace llamado a los miembros*/
    const getColaboradoresYTareasPorUsuarioPropietario = (
        usuarioPropietarioId
    ) => {
        return knex("Proyectos as p")
            .select(
                "p.ID as ID_del_Proyecto",
                "p.Nombre_del_Proyecto as Nombre_del_Proyecto",
                "u_propietario.ID as ID_del_Propietario",
                "u_propietario.Nombre as Nombre_del_Propietario",
                "c.ID as ID_del_Colaborador",
                "u_colaborador.Nombre as Nombre_del_Colaborador",
                "t.ID as ID_de_Tarea",
                "t.Nombre_de_la_Tarea as Nombre_de_Tarea"
            )
            .leftJoin("Colaborador as c", "p.ID", "c.Proyecto_Perteneciente")
            .leftJoin(
                "Usuario as u_colaborador",
                "c.Usuario_Participante",
                "u_colaborador.ID"
            )
            .leftJoin(
                "Usuario as u_propietario",
                "p.Usuario_Propietario",
                "u_propietario.ID"
            )
            .leftJoin("Tarea as t", "c.Tarea_Asiganda", "t.ID")
            .where("u_propietario.ID", usuarioPropietarioId);
    };

    /* Para ver usuario con y son colaborador*/
    const Taressincolaborador = (usuarioPropietarioId) => {
        return knex("Proyectos as p")
            .select(
                "p.ID as ID_del_Proyecto",
                "p.Nombre_del_Proyecto as Nombre_del_Proyecto",
                "u_propietario.ID as ID_del_Propietario",
                "u_propietario.Nombre as Nombre_del_Propietario",
                "c.ID as ID_del_Colaborador",
                "u_colaborador.Nombre as Nombre_del_Colaborador",
                "t.ID as ID_de_Tarea",
                "t.Nombre_de_la_Tarea as Nombre_de_Tarea"
            )
            .leftJoin("Colaborador as c", "p.ID", "c.Proyecto_Perteneciente")
            .leftJoin(
                "Usuario as u_colaborador",
                "c.Usuario_Participante",
                "u_colaborador.ID"
            )
            .leftJoin(
                "Usuario as u_propietario",
                "p.Usuario_Propietario",
                "u_propietario.ID"
            )
            .leftJoin("Tarea as t", "c.Tarea_Asiganda", "t.ID")
            .where("u_propietario.ID", usuarioPropietarioId);
    };

    const taresconcolaborador = (usuarioPropietarioId) => {
        return knex("Tarea as t")
            .select(
                "t.ID as Tarea_ID",
                "t.Nombre_de_la_Tarea as Nombre_de_la_Tarea",
                "t.Estado_de_la_Tarea as Estado_de_la_Tarea_ID",
                "e.Nombre_del_Estado as Nombre_del_Estado_de_la_Tarea",
                "p.ID as Proyecto_ID",
                "p.Nombre_del_Proyecto as Nombre_del_Proyecto"
            )
            .leftJoin("Proyectos as p", "t.Proyecto_Perteneciente", "p.ID")
            .leftJoin("Estado_de_la_Tarea as e", "t.Estado_de_la_Tarea", "e.ID")
            .where("p.Usuario_Propietario", usuarioPropietarioId);
    };


    /*eliminar */
    const eliminarProyectoPorId = (proyectoId) => {
        return knex('Proyectos')
            .where('ID', proyectoId)
            .del();
    };

    const Proyectosincolaborador = (usuarioPropietarioId, estadoEnProcesoDeEsperaId) => {
        return knex("Proyectos as p")
            .select(
                "p.ID as Proyecto_ID",
                "p.Nombre_del_Proyecto as Nombre_del_Proyecto",
                "t.ID as Tarea_ID",
                "t.Nombre_de_la_Tarea as Nombre_de_la_Tarea",
                "t.Descripcion as Descripcion_de_la_Tarea"
            )
            .leftJoin("Tarea as t", "p.ID", "t.Proyecto_Perteneciente")
            .leftJoin("Colaborador as c", "t.ID", "c.Tarea_Asiganda")
            .where("p.Usuario_Propietario", usuarioPropietarioId)
            .andWhere("t.Estado_de_la_Tarea", estadoEnProcesoDeEsperaId)
            .whereNull("c.Tarea_Asiganda") // Verifica si Tarea_Asiganda es nulo
            .groupBy("p.ID", "p.Nombre_del_Proyecto", "t.ID", "t.Nombre_de_la_Tarea", "t.Descripcion");
    };

    const EstadosPromedio = (usuarioPropietarioId) => {
        return knex("Proyectos as p")
            .select(
                "p.ID as Proyecto_ID",
                "p.Nombre_del_Proyecto as Nombre_del_Proyecto",
                knex.raw("AVG(et.Nombre_del_Estado = 'terminado') * 100 as Porcentaje_Terminado"),
                knex.raw("AVG(et.Nombre_del_Estado = 'enproceso') * 100 as Porcentaje_EnProceso"),
                knex.raw("AVG(et.Nombre_del_Estado = 'pendiente') * 100 as Porcentaje_Pendiente")
            )
            .leftJoin("Tarea as t", "p.ID", "t.Proyecto_Perteneciente")
            .leftJoin("Estado_de_la_Tarea as et", "t.Estado_de_la_Tarea", "et.ID")
            .where("p.Usuario_Propietario", usuarioPropietarioId)
            .groupBy("p.ID", "p.Nombre_del_Proyecto")
            .having(knex.raw("COUNT(et.Nombre_del_Estado) > 0"));
    };
    
    return {
        getBuscarUsuarioPorId,
        actualizarUsuario,
        getUsuarioPorIdConTipoCuenta,
        getUsuario,
        getProyectosAsignados,
        getTareasAsignadas,
        getColaboradorYProyectoPorTarea,
        crearUsuario,
        crearProyectos,
        crearTarea,
        crearColaborador,
        crearNotificacion,
        crearHistorialDeMovimiento,
        crearEstadoDeLaTarea,
        actualizarEstadoTarea,
        actualizarNombreYDescripcionProyecto,
        actualizarTarea,
        getColaboradoresYTareasPorUsuarioPropietario,
        Taressincolaborador,
        taresconcolaborador,
        eliminarProyectoPorId,
        Proyectosincolaborador,
        EstadosPromedio

    };
};

module.exports = {
    dbservice,
};
