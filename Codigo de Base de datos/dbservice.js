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
            Contrasenia: Contrasenia
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
        Tarea_Asignada
    ) => {
        return knex(Colaborador).insert({
            Usuario_Participante: Usuario_Participante,
            Proyecto_Perteneciente: Proyecto_Perteneciente,
            Tarea_Asignada: Tarea_Asignada,
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
        Usuario_que_Realizo_el_Movimiento,
        Tipo_de_Movimiento,
        Estado_de_la_Tarea,
        Tarea
    ) => {
        return knex(HistorialDeMovimiento).insert({
            Fecha_y_Hora_del_Movimiento: Fecha_y_Hora_del_Movimiento,
            Usuario_que_Realizo_el_Movimiento: Usuario_que_Realizo_el_Movimiento,
            Tipo_de_Movimiento: Tipo_de_Movimiento,
            Estado_de_la_Tarea: Estado_de_la_Tarea,
            Tarea: Tarea
        });
    };

    const crearTipoDeCuenta = (
        Nombre_del_Tipo_de_Cuenta,
        Descripcion_del_Tipo_de_Cuenta
    ) => {
        return knex(TipoDeCuenta).insert({
            Nombre_del_Tipo_de_Cuenta: Nombre_del_Tipo_de_Cuenta,
            Descripcion_del_Tipo_de_Cuenta: Descripcion_del_Tipo_de_Cuenta,
        });
    };
    const crearEstadoDeLaTarea = (
        Nombre_del_Estado,
        Descripcion_del_Estado
    ) => {
        return knex(EstadoDeLaTarea).insert({
            Nombre_del_Estado: Nombre_del_Estado,
            Descripcion_del_Estado: Descripcion_del_Estado,
        });
    };


    const getUsuarioPorIdConTipoCuenta = (usuarioId) => {
        return knex('Usuario as U')
            .select('U.ID as Usuario_ID', 'U.Nombre as Nombre_Usuario', 'U.Correo_Electronico', 'U.Rol', 'U.Fecha_de_Registro', 'TC.Nombre_del_Tipo_de_Cuenta')
            .leftJoin('Tipo_de_Cuenta as TC', 'U.Tipo_de_Cuenta', 'TC.ID')
            .where('U.ID', usuarioId)
            .first()
            .then((usuario) => {
                if (usuario) {
                    return usuario;
                } else {
                    throw new Error('Usuario no encontrado');
                }
            });
    };
    

    /* Sirve para actualizar los datos por medio del ID */
    const actualizarUsuario = (usuarioId, userData) => {
        return knex(Usuario)
            .where('ID', usuarioId)
            .update(userData);
    };

    /* Sirve para buscar y unir tablas*/
    const getBuscarUsuarioPorId = (usuarioId) => {
        return knex('Usuario')
            .select('Usuario.Nombre', 'Tipo_de_Cuenta.Nombre_del_Tipo_de_Cuenta', 'Tipo_de_Cuenta.Descripcion_del_Tipo_de_Cuenta')
            .leftJoin('Tipo_de_Cuenta', 'Usuario.Tipo_de_Cuenta', 'Tipo_de_Cuenta.ID')
            .where('Usuario.ID', usuarioId)
            .first();
    };
    /*Buscar los proyectos que tiene asignados */
    const getProyectosAsignados = (usuarioId) => {
        return knex('Proyectos as p')
            .select('p.ID', 'p.Nombre_del_Proyecto', 'p.Descripcion', 'p.Fecha_de_Creacion')
            .where('p.Usuario_Propietario', usuarioId);
    };

    /* Buscar las tareas asignadas a un usuario */
    const getTareasAsignadas = (usuarioId) => {
        return knex('Tarea as t')
            .select('t.ID as Tarea_ID', 't.Nombre_de_la_Tarea', 't.Descripcion as Tarea_Descripcion', 't.Fecha_de_Creacion as Tarea_Fecha_de_Creacion', 'p.Nombre_del_Proyecto', 'e.Nombre_del_Estado as Estado_de_la_Tarea')
            .innerJoin('Proyectos as p', 't.Proyecto_Perteneciente', 'p.ID')
            .innerJoin('Estado_de_la_Tarea as e', 't.Estado_de_la_Tarea', 'e.ID')
            .innerJoin('Colaborador as c', 't.ID', 'c.Tarea_Asiganda')
            .where('c.Usuario_Participante', usuarioId);
    };


    return {
        getBuscarUsuarioPorId,
        actualizarUsuario,
        getUsuarioPorIdConTipoCuenta,
        getUsuario,
        getProyectosAsignados,
        getTareasAsignadas,
        crearUsuario,
        crearProyectos,
        crearTarea,
        crearColaborador,
        crearNotificacion,
        crearHistorialDeMovimiento,
        crearTipoDeCuenta,
        crearEstadoDeLaTarea,

    };

};



module.exports = {
    dbservice,
};
