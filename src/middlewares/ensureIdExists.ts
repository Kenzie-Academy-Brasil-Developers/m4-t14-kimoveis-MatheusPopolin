import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";
import { tUserRepo } from "../interfaces";

const ensureIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const usersRepository: tUserRepo = AppDataSource.getRepository(User);

  const exists: boolean = await usersRepository.exist({
    where: { id: Number(request.params.id) },
  });

  if (!exists) {
    throw new AppError("User not found", 404);
  }

  next();
};

export default ensureIdExists;
