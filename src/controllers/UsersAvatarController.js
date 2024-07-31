import knex from "../database/knex/index.js";
import DiskStorage from "../providers/DiskStorage.js";
import AppError from "../utils/AppError.js";

const diskStorage = new DiskStorage();

export class UsersAvatarController {
  async update(request, response) {
    const user_id = request.user.id;
    const avatarFileName = request.file.filename;

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("User not authenticated.", 401);
    }

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar);
    }

    const fileName = await diskStorage.saveFile(avatarFileName);
    user.avatar = fileName;

    await knex("users").where({ id: user_id }).update({
      avatar: user.avatar,
      updated_at: knex.fn.now(),
    });

    return response.json(user);
  }
}
