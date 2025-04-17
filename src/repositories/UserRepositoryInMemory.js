export class UserRepositoryInMemory {
  users = [];

  async findByEmail(email) {
    return this.users.find((user) => user.email === email);
  }

  async create({ name, email, password }) {
    const user = {
      id: this.users.length + 1,
      name,
      email,
      password,
      avatar: null,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.users.push(user);

    return user;
  }
}
