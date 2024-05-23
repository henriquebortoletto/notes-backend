import knex from "../database/knex/index.js";
import { AppError } from "../utils/AppError.js";

export class NotesController {
  async show(request, response) {
    const { id } = request.params;

    const note = await knex("notes").where({ id }).first();

    if (!note) {
      throw new AppError("Note not found.");
    }

    const tags = await knex("tags").where({ note_id: note.id }).orderBy("name");
    const links = await knex("links")
      .where({ note_id: note.id })
      .orderBy("created_at");

    return response.status(200).json({
      ...note,
      tags,
      links,
    });
  }

  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const { user_id } = request.params;

    const [noteId] = await knex("notes").insert({
      title,
      description,
      user_id,
    });

    const linksInsert = links.map((link) => ({
      url: link,
      note_id: noteId,
    }));

    const tagsInsert = tags.map((tag) => ({
      name: tag,
      note_id: noteId,
    }));

    await knex("links").insert(linksInsert);
    await knex("tags").insert(tagsInsert);

    return response.status(201).json();
  }

  async delete(request, response) {
    const { id } = request.params;

    const noteHasDeleted = await knex("notes").where({ id }).delete();

    if (!noteHasDeleted) {
      throw new AppError("Note not found.");
    }

    return response.status(200).json();
  }
}
