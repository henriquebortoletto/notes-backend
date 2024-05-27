import bcrypt from "bcryptjs";

import knex from "../database/knex/index.js";
import AppError from "../utils/AppError.js";

export class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const checkUserExists = await knex("users").where({ email }).first();

    if (checkUserExists) {
      throw new AppError("User already exists.");
    }

    const criptoPassword = await bcrypt.hash(password, 10);

    await knex("users").insert({
      name,
      email,
      password: criptoPassword,
    });

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const user = await knex("users").where({ id }).first();

    if (!user) {
      throw new AppError("User not found.");
    }

    const userWithUpdatedEmail = await knex("users").where({ email }).first();

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

    await knex("users").where({ id }).update({
      name: user.name,
      email: user.email,
      password: user.password,
      updated_at: knex.fn.now(),
    });

    return response.status(200).json();
  }
}
