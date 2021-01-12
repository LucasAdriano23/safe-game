
    exports.up = function(knex, Promise) {
        return knex.schema.createTable('premios', table => {
            table.increments('id').primary();
            table.integer('idEmpresa').unsigned().notNullable();
            table.foreign('idEmpresa').references('id').inTable('empresa');
            table.string('descPremio',255).defaultTo(null);
        })
    };

    exports.down = function(knex, Promise) {
        return knex.schema.dropTable('premios')

    };