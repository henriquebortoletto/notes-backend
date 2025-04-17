import { UserRepositoryInMemory } from "../repositories/UserRepositoryInMemory";
import { UserCreateService } from "./UserCreateService";

import AppError from "../utils/AppError";

describe("UserCreateService", () => {
  let userRepositoryInMemory;
  let userCreateService;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepositoryInMemory);
  });

  it("should be able to create a new user", async () => {
    const user = {
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456",
    };

    const userCreated = await userCreateService.execute(user);

    expect(userCreated).toHaveProperty("id");
  });

  it("should not be able to create a new user with existing email", async () => {
    const user1 = {
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456",
    };

    const user2 = {
      name: "Marie Curie",
      email: "johndoe@email.com",
      password: "123456",
    };

    await userCreateService.execute(user1);

    await expect(userCreateService.execute(user2)).rejects.toEqual(
      new AppError("User already exists.")
    );
  });
});
