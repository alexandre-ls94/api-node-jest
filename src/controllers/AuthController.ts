import { Request, Response } from "express";
import { ServiceError } from "@helpers/error";
import { StatusCode } from "@helpers/statusCode";
import AuthService from "@services/AuthService";

class AuthController {
  async login(request: Request, response: Response) {
    try {
      const token = await AuthService.login(request.body);
      return response.status(StatusCode.SUCCESS).json({token});
    } catch (error) {
      if (error instanceof ServiceError) {
        return response.status(error.statusCode).json({
          error: error.message,
        });
      }

      return response
        .status(StatusCode.INTERNAL_ERROR)
        .json({ error: "Server error" });
    }
  }
}

export default new AuthController();
