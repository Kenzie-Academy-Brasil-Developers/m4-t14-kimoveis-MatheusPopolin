import { Request, Response } from "express";
import { RealEstate } from "../entities";
import {
  createRealEstateService,
  listAllRealEstatesService,
} from "../services";

export const createRealEstateController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const newRealEstate: RealEstate = await createRealEstateService(request.body);

  return response.status(201).json(newRealEstate);
};

export const listAllRealEstatesController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const RealEstates: RealEstate[] = await listAllRealEstatesService();

  return response.status(200).json(RealEstates);
};
