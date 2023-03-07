import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { tUserRequest, tUserReturn, tUserRepo } from "../interfaces";
import { returnUserSchema } from "../schemas";

export const createUserService = async (
  payload: tUserRequest
): Promise<tUserReturn> => {
  const usersRepository: tUserRepo = AppDataSource.getRepository(User);

  const newUser: User = await usersRepository.save(payload);

  const parsedNewUser: tUserReturn = returnUserSchema.parse(newUser);

  return parsedNewUser;
};
