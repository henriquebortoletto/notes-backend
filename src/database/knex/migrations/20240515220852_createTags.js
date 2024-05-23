export function up(knex) {
  return knex.schema.createTable("tags", function (table) {
    table.increments("id");
    table.string("name").notNullable();
    table
      .integer("note_id")
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTable("tags");
}
