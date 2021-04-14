import UserService from "@services/UserService";
import { Request, Response } from "express";
import { ServiceError, ValidationError } from "@helpers/error";
import { StatusCode } from "@helpers/statusCode";

class UserController {
  async index(request: Request, response: Response) {
    try {
      const users = await UserService.getAll();
      return response.status(StatusCode.SUCCESS).json(users);
    } catch (error) {
      console.log(error);

      return response
        .status(StatusCode.INTERNAL_ERROR)
        .json({ error: "Server error" });
    }
  }

  async show(request: Request, response: Response) {
    try {
      const user = await UserService.getById(request.params.id);
      return response.status(StatusCode.SUCCESS).json(user);
    } catch (error) {
      console.log(error);

      if (error instanceof ServiceError) {
        return response.status(error.statusCode).json({
          error: error.message,
        });
      }
    }

    return response
      .status(StatusCode.INTERNAL_ERROR)
      .json({ error: "Server error" });
  }

  async store(request: Request, response: Response) {
    try {
      const user = await UserService.registerUser(request.body);
      return response.status(StatusCode.CREATED).json(user);
    } catch (error) {
      console.log(error);
      
      if (error instanceof ValidationError) {
        return response.status(error.statusCode).json({
          errors: error.errors,
        });
      }

      if (error instanceof ServiceError) {
        return response.status(error.statusCode).json({
          error: error.message,
        });
      }
    }

    return response
      .status(StatusCode.INTERNAL_ERROR)
      .json({ error: "Server error" });
  }
}

export default new UserController();
