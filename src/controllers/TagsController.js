import knex from "../database/knex/index.js";

export class TagsController {
  async index(request, response) {
    const user_id = request.user.id;

    const tags = await knex("tags").where({ user_id });

    return response.status(200).json(tags);
  }
}
