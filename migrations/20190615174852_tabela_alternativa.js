exports.up = function(knex, Promise) {
    return knex.schema.createTable('alternativa', table => {
        table.increments('id').primary();
        table.integer('idCarta').unsigned().notNullable();
        table.foreign('idCarta').references('carta.id');
        table.string('alternativa',255);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('alternativa')

};