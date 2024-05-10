import bcrypt from "bcryptjs";

import { DB } from "../database/sqlite/index.js";
import { AppError } from "../utils/AppError.js";

const database = new DB();

export class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const query = await database.connection();
    const checkUserExists = await query.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (checkUserExists) throw new AppError("User already exists.");
    const criptoPassword = await bcrypt.hash(password, 10);

    await query.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, criptoPassword]
    );

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const query = await database.connection();

    const user = await query.get("SELECT * FROM users WHERE id = (?)", [id]);
    if (!user) throw new AppError("User not found.");

    const userWithUpdatedEmail = await query.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("E-mail already in use.");
    }

    if (password && !old_password) {
      throw new AppError(
        "You need to inform the old password to set a new password."
      );
    }

    if (password && old_password) {
      const checkOldPassword = await bcrypt.compare(
        old_password,
        user.password
      );

      if (!checkOldPassword) throw new AppError("Old password does not match.");
      user.password = await bcrypt.hash(password, 10);
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    await query.run(
      "UPDATE users SET name = ?, email = ?, password = ?, updated_at = DATETIME('now') WHERE id = ?",
      [user.name, user.email, user.password, user.id]
    );

    return response.status(200).json();
  }
}
