import { UserRepository } from "../repositories/UserRepository.js";

import { UserCreateService } from "../services/UserCreateService.js";
import { UserUpdateService } from "../services/UserUpdateService.js";

const userRepository = new UserRepository();

const userCreateService = new UserCreateService(userRepository);
const userUpdateService = new UserUpdateService(userRepository);

export class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    await userCreateService.execute({ name, email, password });

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    await userUpdateService.execute({
      userId: user_id,
      name,
      email,
      password,
      oldPassword: old_password,
    });

    return response.status(200).json();
  }
}
