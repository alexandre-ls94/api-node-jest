import { BadRequestError, UnauthorizedError } from "@helpers/error";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const secretToken = process.env.JWT_SECRET;

function AuthMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const header = request.headers["authorization"];

  if (!header) {
    throw new UnauthorizedError("You need to be authenticated!");
  }

  const parts = header.split(" ");

  if (parts.length !== 2) {
    throw new BadRequestError("Invalid token");
  }

  const [, token] = parts;

  if (!secretToken) return;

  jwt.verify(token, secretToken, (error, decode) => {
    if (error) {
      throw new BadRequestError("Invalid token");
    }

    response.locals["user"] = decode;
    next();
  });
}

export default AuthMiddleware;
