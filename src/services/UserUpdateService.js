import bcrypt from "bcryptjs";

import AppError from "../utils/AppError.js";

export class UserUpdateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ userId, name, email, password, oldPassword }) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found.");
    }

    const userWithUpdatedEmail = await this.userRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("E-mail already in use.");
    }

    if (password && !oldPassword) {
      throw new AppError(
        "You need to inform the old password to set a new password."
      );
    }

    if (password && oldPassword) {
      const checkOldPassword = await bcrypt.compare(oldPassword, user.password);

      if (!checkOldPassword) {
        throw new AppError("Old password does not match.");
      }

      user.password = await bcrypt.hash(password, 10);
    }

    user.name = name ? name : user.name;
    user.email = email ? email : user.email;

    await this.userRepository.update({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
}
