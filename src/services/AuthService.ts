import connection from "@database/index";
import jwt from "jsonwebtoken";
import { BadRequestError, UnauthorizedError } from "@helpers/error";
import { IUser } from "@typing/user";
import { verifyPassword } from "@utils/Password";

const secretToken = process.env.JWT_SECRET;

class AuthService {
  public async login(body: IUser) {
    const { email, password } = body;

    if (!email || !password) {
      throw new BadRequestError("Email or password invalid");
    }

    const user = await connection
      .first(["id", "email", "password"])
      .where({ email: email })
      .from("users");

    if (!user) {
      throw new BadRequestError("Email or password incorrect");
    }

    if (await verifyPassword(user.password, password)) {
      if (!secretToken) return;

      const token = jwt.sign({ id: user.id }, secretToken);

      return token;
    }

    throw new UnauthorizedError("Email or password do not match");
  }
}

export default new AuthService();
