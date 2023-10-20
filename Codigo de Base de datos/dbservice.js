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
    const Tablero = "Tablero";
    const ListaDeTarea = "Lista_de_Tarea";
    const Tarjeta = "Tarjeta";
    const Comentario = "Comentario";
    const Etiqueta = "Etiqueta";
    const HistorialDeMovimiento = "Historial_de_Movimiento";
    const TipoDeMovimiento = "tipo_de_movimiento";
    const TipoDeCuenta = "tipo_de_cuenta";
    const TipoDePago = "tipo_de_Pago";
    const EstadoDeLaTarjeta = "Estado_de_la_Tarjeta";
    const Participante = "Participante";
    const DatosDeTarjeta = "Datos_de_Tarjeta";

    // Funciones de consulta
    const getUsuario = () => {
        return knex(Usuario).select();
    };

    const getTablero = () => {
        return knex(Tablero).select();
    };

    const getListaDeTarea = () => {
        return knex(ListaDeTarea).select();
    };

    const getTarjeta = () => {
        return knex(Tarjeta).select();
    };

    const getComentario = () => {
        return knex(Comentario).select();
    };

    const getEtiqueta = () => {
        return knex(Etiqueta).select();
    };

    const getHistorialDeMovimiento = () => {
        return knex(HistorialDeMovimiento).select();
    };

    const getTipoDeMovimiento = () => {
        return knex(TipoDeMovimiento).select();
    };

    const getTipoDeCuenta = () => {
        return knex(TipoDeCuenta).select();
    };

    const getTipoDePago = () => {
        return knex(TipoDePago).select();
    };

    const getEstadoDeLaTarjeta = () => {
        return knex(EstadoDeLaTarjeta).select();
    };

    const getParticipante = () => {
        return knex(Participante).select();
    };

    const getDatosDeTarjeta = () => {
        return knex(DatosDeTarjeta).select();
    };

    //Funciones para ingresar
    const crearUsuario = (
        Nombre,
        Correo_Electronico,
        Rol,
        Fecha_de_Registro,
        Tipo_de_Cuenta,
        Tipo_de_Pago,
        Contrasenia
    ) => {
        return knex('Usuario').insert({
            Nombre: Nombre,
            Correo_Electronico: Correo_Electronico,
            Rol: Rol,
            Fecha_de_Registro: Fecha_de_Registro,
            Tipo_de_Cuenta: Tipo_de_Cuenta,
            Tipo_de_Pago: Tipo_de_Pago,
            Contrasenia: Contrasenia
        });
    };
    

    const crearTablero = (
        Nombre_del_Tablero,
        Descripcion,
        Fecha_de_Creacion,
        Usuario_Propietario
    ) => {
        return knex(Tablero).insert({
            Nombre_del_Tablero: Nombre_del_Tablero,
            Descripcion: Descripcion,
            Fecha_de_Creacion: Fecha_de_Creacion,
            Usuario_Propietario: Usuario_Propietario,
        });
    };

    const crearListaDeTarea = (
        Nombre_de_la_Lista,
        Posicion_en_el_Tablero,
        Tablero_Perteneciente
    ) => {
        return knex(ListaDeTarea).insert({
            Nombre_de_la_Lista: Nombre_de_la_Lista,
            Posicion_en_el_Tablero: Posicion_en_el_Tablero,
            Tablero_Perteneciente: Tablero_Perteneciente,
        });
    };

    const crearTarjeta = (
        Titulo_de_la_Tarjeta,
        Descripcion,
        Fecha_de_Creacion,
        Lista_Perteneciente,
        Asignado_a,
        Estado_de_la_Tarjeta
    ) => {
        return knex(Tarjeta).insert({
            Titulo_de_la_Tarjeta: Titulo_de_la_Tarjeta,
            Descripcion: Descripcion,
            Fecha_de_Creacion: Fecha_de_Creacion,
            Lista_Perteneciente: Lista_Perteneciente,
            Asignado_a: Asignado_a,
            Estado_de_la_Tarjeta: Estado_de_la_Tarjeta,
        });
    };

    const crearComentario = (
        Texto_del_Comentario,
        Fecha_de_Publicacion,
        Usuario_que_Realizo_el_Comentario,
        Tarjeta_que_se_Refiere
    ) => {
        return knex(Comentario).insert({
            Texto_del_Comentario: Texto_del_Comentario,
            Fecha_de_Publicacion: Fecha_de_Publicacion,
            Usuario_que_Realizo_el_Comentario: Usuario_que_Realizo_el_Comentario,
            Tarjeta_que_se_Refiere: Tarjeta_que_se_Refiere,
        });
    };

    const crearEtiqueta = (Nombre_de_la_Etiqueta, Color_de_la_Etiqueta) => {
        return knex(Etiqueta).insert({
            Nombre_de_la_Etiqueta: Nombre_de_la_Etiqueta,
            Color_de_la_Etiqueta: Color_de_la_Etiqueta,
        });
    };

    const crearHistorialDeMovimiento = (
        Fecha_y_Hora_del_Movimiento,
        Usuario_que_Realizo_el_Movimiento,
        Tipo_de_Movimiento,
        Tarjeta_Afectada
    ) => {
        return knex(HistorialDeMovimiento).insert({
            Fecha_y_Hora_del_Movimiento: Fecha_y_Hora_del_Movimiento,
            Usuario_que_Realizo_el_Movimiento: Usuario_que_Realizo_el_Movimiento,
            Tipo_de_Movimiento: Tipo_de_Movimiento,
            Tarjeta_Afectada: Tarjeta_Afectada,
        });
    };

    const crearTipoDeMovimiento = (
        Nombre_del_Tipo_de_Movimiento,
        Descripcion_del_Tipo_de_Movimiento
    ) => {
        return knex(TipoDeMovimiento).insert({
            Nombre_del_Tipo_de_Movimiento: Nombre_del_Tipo_de_Movimiento,
            Descripcion_del_Tipo_de_Movimiento: Descripcion_del_Tipo_de_Movimiento,
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

    const crearTipoDePago = (
        Nombre_del_Tipo_de_Pago,
        Descripcion_del_Tipo_de_Pago
    ) => {
        return knex(TipoDePago).insert({
            Nombre_del_Tipo_de_Pago: Nombre_del_Tipo_de_Pago,
            Descripcion_del_Tipo_de_Pago: Descripcion_del_Tipo_de_Pago,
        });
    };EstadoDeLaTarjeta

    const crearEstadoDeLaTarjeta = (
        Nombre_del_Estado,
        Descripcion_del_Estado
    ) => {
        return knex(EstadoDeLaTarjeta).insert({
            Nombre_del_Estado: Nombre_del_Estado,
            Descripcion_del_Estado: Descripcion_del_Estado,
        });
    };

    const crearParticipante = (Usuario_Participante, Tarjeta_asociada) => {
        return knex(Participante).insert({
            Usuario_Participante: Usuario_Participante,
            Tarjeta_asociada: Tarjeta_asociada,
        });
    };

    const crearDatosDeTarjeta = (
        Numero_de_Tarjeta,
        Mes_de_Vencimiento,
        Ano_de_Vencimiento,
        Codigo_de_Seguridad,
        Tipo_de_Pago
    ) => {
        return knex(DatosDeTarjeta).insert({
            Numero_de_Tarjeta: Numero_de_Tarjeta,
            Mes_de_Vencimiento: Mes_de_Vencimiento,
            Ano_de_Vencimiento: Ano_de_Vencimiento,
            Codigo_de_Seguridad: Codigo_de_Seguridad,
            Tipo_de_Pago: Tipo_de_Pago,
        });
    };

    return {
        getUsuario,
        getTablero,
        getListaDeTarea,
        getTarjeta,
        getComentario,
        getEtiqueta,
        getHistorialDeMovimiento,
        getTipoDeMovimiento,
        getTipoDeCuenta,
        getTipoDePago,
        getEstadoDeLaTarjeta,
        getParticipante,
        getDatosDeTarjeta,
        crearUsuario,
        crearTablero,
        crearListaDeTarea,
        crearTarjeta,
        crearComentario,
        crearEtiqueta,
        crearHistorialDeMovimiento,
        crearTipoDeMovimiento,
        crearTipoDeCuenta,
        crearTipoDePago,
        crearEstadoDeLaTarjeta,
        crearParticipante,
        crearDatosDeTarjeta

    };
};

module.exports = {
    dbservice,
};
