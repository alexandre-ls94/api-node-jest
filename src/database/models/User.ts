import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { v4 as uuid } from "uuid";

class User {
  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

  id: string;

  @IsNotEmpty()
  @MinLength(3, { message: "The name must contain more than 3 characters" })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6, {message: "The password  must contain more than 6 characters"})
  password: string;
}

export { User };
