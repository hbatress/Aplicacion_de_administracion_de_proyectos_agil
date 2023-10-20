const dbservice = () => {
    const knex = require('knex')({
        client: 'mysql',
        connection: {
            host : process.env.DB_HOST,
            port : 3306,
            user : process.env.DB_USER,
            password : process.env.DB_PASS,
            database : process.env.DB,
        }
    });
// Declaraciones de constantes
const Usuario = 'Usuario';
const Tablero = 'Tablero';
const ListaDeTarea = 'Lista_de_Tarea';
const Tarjeta = 'Tarjeta';
const Comentario = 'Comentario';
const Etiqueta = 'Etiqueta';
const HistorialDeMovimiento = 'Historial_de_Movimiento';
const TipoDeMovimiento = 'tipo_de_movimiento';
const TipoDeCuenta = 'tipo_de_cuenta';
const TipoDePago = 'tipo_de_Pago';
const EstadoDeLaTarjeta = 'Estado_de_la_Tarjeta';
const Participante = 'Participante';
const DatosDeTarjeta = 'Datos_de_Tarjeta';

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
    return {getUsuario,
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
    };

};

module.exports = {
    dbservice
};

