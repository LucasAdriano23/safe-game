

exports.up = function(knex, Promise) {
    return knex.schema.createTable('carta', table => {
        table.increments('id').primary();
        table.text('questao');
        table.integer('idAlternativaCerta');
        table.string('tipoCarta',120);
        table.string('dsjogo',255);
        table.string('dificuldade',140);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('carta')

};