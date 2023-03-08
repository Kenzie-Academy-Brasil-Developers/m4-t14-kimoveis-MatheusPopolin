import { compare } from "bcryptjs";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";
import { tLoginRequest, tUserRepo } from "../interfaces";
import jwt from "jsonwebtoken";

export const loginService = async (payload: tLoginRequest): Promise<string> => {
  const usersRepository: tUserRepo = AppDataSource.getRepository(User);

  const user: User | null = await usersRepository.findOneBy({
    email: payload.email,
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const matchPassword: boolean = await compare(payload.password, user.password);

  if (!matchPassword) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = jwt.sign(
    {
      admin: user.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: user.id.toString(),
    }
  );

  return token;
};
