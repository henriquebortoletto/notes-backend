import knex from "../database/knex/index.js";
import AppError from "../utils/AppError.js";

export class NotesController {
  async index(request, response) {
    const { title, tags } = request.query;
    const user_id = request.user.id;

    let notes;

    if (tags) {
      const filterTags = tags.split(",").map((tag) => tag.trim());

      notes = await knex("tags")
        .select(["notes.id", "notes.title", "notes.user_id"])
        .where("notes.user_id", user_id)
        .whereLike("notes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("notes", "notes.id", "tags.note_id")
        .orderBy("notes.title");
    } else {
      notes = await knex("notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }

    const userTags = await knex("tags").where({ user_id });

    const notesWithTags = notes.map((note) => {
      const noteTags = userTags.filter((tag) => tag.note_id === note.id);
      return { ...note, tags: noteTags };
    });

    return response.status(200).json(notesWithTags);
  }

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
    const user_id = request.user.id;

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
      user_id,
      note_id: noteId,
    }));

    await knex("links").insert(linksInsert);
    await knex("tags").insert(tagsInsert);

    return response.status(201).json();
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("notes").where({ id }).delete();

    return response.status(200).json();
  }
}
