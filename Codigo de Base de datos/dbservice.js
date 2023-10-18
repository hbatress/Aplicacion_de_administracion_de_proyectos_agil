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
    const table = 'tipo_de_cuenta';

    const gettipo_de_cuenta = () => {
        return knex(table).select();
    };

    return {gettipo_de_cuenta};
};

module.exports = {
    dbservice
};