import knex from "../database/knex/index.js";

export class UserRepository {
  async findByEmail(email) {
    const user = await knex("users").where({ email }).first();

    return user;
  }

  async findById(id) {
    const user = await knex("users").where({ id }).first();

    return user;
  }

  async create({ name, email, password }) {
    const [user] = await knex("users")
      .insert({
        name,
        email,
        password,
      })
      .returning("*");

    return user;
  }

  async update({ id, name, email, password }) {
    await knex("users").where({ id }).update({
      name,
      email,
      password,
      updated_at: knex.fn.now(),
    });
  }
}
