
exports.up = function(knex, Promise) {
    return knex.schema.createTable('relatorio', table => {
        table.integer('idEmpresa').unsigned().notNullable();
        table.integer('idRespostaUsuario').unsigned().notNullable();
        table.foreign('idEmpresa').references('id').inTable('empresa');
        table.foreign('idRespostaUsuario').references('id').inTable('respostaUsuario');

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('relatorio')
};