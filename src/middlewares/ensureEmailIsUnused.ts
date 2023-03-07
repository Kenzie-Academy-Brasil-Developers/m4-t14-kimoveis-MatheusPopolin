import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";
import { tUserRepo } from "../interfaces";

const ensureEmailIsUnused = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const usersRepository: tUserRepo = AppDataSource.getRepository(User);

  const userEmail = request.body.email;

  if (userEmail) {
    const exists: boolean = await usersRepository.exist({
      where: { email: userEmail },
    });

    if (exists) {
      throw new AppError("Email already exists", 409);
    }
  }

  next();
};

export default ensureEmailIsUnused;
