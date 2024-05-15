export function up(knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id");
    table.string("name");
    table.string("email").unique();
    table.string("password");
    table.string("avatar");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTable("users");
}
