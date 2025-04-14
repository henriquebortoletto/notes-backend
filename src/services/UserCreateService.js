import bcryptjs from "bcryptjs";

import AppError from "../utils/AppError.js";

export class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }) {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("User already exists.");
    }

    const criptoPassword = await bcryptjs.hash(password, 10);

    await this.userRepository.create({
      name,
      email,
      password: criptoPassword,
    });
  }
}
