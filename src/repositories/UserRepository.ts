import { validate } from "class-validator";

import connectDatabase from "@database/index";
import { UserRegisterDTO } from "@dto/user/UserDTO";
import { ValidationError } from "@helpers/error";
import { User } from "@database/models/User";

class UserRepository {
  async getAll() {
    const users = await connectDatabase
      .select(["id", "name", "email"])
      .from<User>("users");

    return users;
  }

  async getById(id: string) {
    const user = await connectDatabase
      .first(["id", "name", "email"])
      .where("id", id)
      .from<User>("users");

    return user;
  }

  async getByEmail(email: string) {
    const user = await connectDatabase
      .first(["id", "name", "email"])
      .where("email", email)
      .from<User>("users");

    return user;
  }

  async register(data: UserRegisterDTO, password: string) {
    const user = new User();

    user.name = data.name;
    user.email = data.email;
    user.password = password;
    
    const errors = await validate(user);
    
    if (errors.length > 0) {
      throw new ValidationError(errors);
    }
    
    await connectDatabase
      .insert(user)
      .from<User>("users");

    return user;
  }
}

export default UserRepository;
