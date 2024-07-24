import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import knex from "../database/knex/index.js";
import AppError from "../utils/AppError.js";

export class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;

    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("E-mail or password incorrect.", 401);
    }

    const checkPasswordMatch = await bcrypt.compare(password, user.password);

    if (!checkPasswordMatch) {
      throw new AppError("E-mail or password incorrect.", 401);
    }

    const token = jwt.sign({}, process.env.JWT_TOKEN_SECRET, {
      subject: String(user.id),
      expiresIn: "1d",
    });

    return res.status(201).json({ user, token });
  }
}
