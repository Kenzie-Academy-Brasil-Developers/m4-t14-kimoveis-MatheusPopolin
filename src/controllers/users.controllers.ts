import { Request, Response } from "express";
import { tUserReturn } from "../interfaces";
import { createUserService } from "../services";

export const createUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const newUser: tUserReturn = await createUserService(request.body);

  return response.status(201).json(newUser);
};
