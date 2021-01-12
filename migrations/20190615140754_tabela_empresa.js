
exports.up = function(knex, Promise) {
    return knex.schema.createTable('empresa', table => {

        table.increments('id').primary();
        table.string('nomeEmpresa',255);
        table.string('cnpj',18);
        table.string('ramo',255);
        table.string('emailEmpresa',255);
        table.timestamp('data_criacao')
                .defaultTo(knex.fn.now());
        })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('empresa')
};
