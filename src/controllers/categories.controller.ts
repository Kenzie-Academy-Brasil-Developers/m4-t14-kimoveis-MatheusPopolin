import { Request, Response } from "express";
import { Category } from "../entities";
import {
  createCategoryService,
  listAllCategoriesService,
  listCategoryRealEstatesService,
} from "../services";

export const createCategoryController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const newCategory: Category = await createCategoryService(request.body);

  return response.status(201).json(newCategory);
};

export const listAllCategoriesController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const categories: Category[] = await listAllCategoriesService();

  return response.status(200).json(categories);
};

export const listCategoryRealEstatesController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const categoryRealEstates: Category = await listCategoryRealEstatesService(
    Number(request.params.id)
  );

  return response.status(200).json(categoryRealEstates);
};
