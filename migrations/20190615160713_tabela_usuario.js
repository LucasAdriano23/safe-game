exports.up = function(knex, Promise) {
    return knex.schema.createTable('usuario', table => {
        table.increments('id').primary();
        table.string('nomeUsuario',80).notNullable();
        table.string('email',80);
        table.string('senha',80).notNullable();
        table.string('nome',255);
        table.string('sobreNome',255);
        table.integer('pontuacao').defaultTo(0);
        table.string('sexo',80).defaultTo(null);
        table.string('tipo_login');
        table.string('cpf').defaultTo(null);
        table.timestamp('data_criacao').defaultTo(knex.fn.now());
        table.integer('idEmpresa').unsigned().notNullable();
        table.foreign('idEmpresa').references('id').inTable('empresa');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('usuario')
};