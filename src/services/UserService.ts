import { UserRegisterDTO } from '@dto/user/UserDTO';
import UserRepository from '@repositories/UserRepository';
import { BadRequestError, ConflictError, NotFoundError } from '@helpers/error';
import { hashPassword } from '@utils/Password';

class UserService {
  repository = new UserRepository();

  public async getAll() {
    const users = await this.repository.getAll();

    return users;
  }

  public async getById(id: string) {
    const user = await this.repository.getById(id);

    if(!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }

  public async registerUser(data: UserRegisterDTO) {
    const {name, email, password} = data;

    if(name.length < 1 || email.length < 1 || password.length < 1) {
      throw new BadRequestError("All data is required");
    }

    const userExist = await this.repository.getByEmail(data.email);

    if(userExist) {
      throw new ConflictError("It is not possible to register this email");
    }

    const passwordHash = await hashPassword(data.password);

    const user = await this.repository.register(data, passwordHash);

    return user;
  }
}

export default new UserService();