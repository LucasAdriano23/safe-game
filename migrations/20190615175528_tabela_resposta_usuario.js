
exports.up = function(knex, Promise) {
    return knex.schema.createTable('respostaUsuario', table => {
        table.increments('id');
        table.integer('idCarta').unsigned().notNullable();
        table.integer('idUsuario').unsigned().notNullable();
        table.integer('idAlternativaMarcada').unsigned().notNullable();
        table.foreign('idCarta').references('id').inTable('carta');
        table.foreign('idUsuario').references('id').inTable('usuario');
        table.foreign('idAlternativaMarcada').references('id').inTable('alternativa');
        table.timestamp('data_criacao')
            .defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('respostaUsuario')

};