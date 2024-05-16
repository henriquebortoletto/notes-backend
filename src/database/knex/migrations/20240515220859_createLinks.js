export function up(knex) {
  return knex.schema.createTable("links", function (table) {
    table.increments("id");
    table.string("url").notNullable();
    table
      .integer("note_id")
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTable("links");
}
