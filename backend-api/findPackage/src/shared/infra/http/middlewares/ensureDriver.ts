import { NextFunction, Request, Response } from "express";
import { UsersRepository } from "../../../../modules/accounts/infra/repositories/UsersRepository";
import { AppError } from "../../../errors/AppError";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const { id } = request.user;
  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);
  if (!user.isDriver) {
    throw new AppError("User is not a Driver");
  }
  return next();
}