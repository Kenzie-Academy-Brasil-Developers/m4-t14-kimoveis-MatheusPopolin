import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import { AppError } from "../errors";
import { tCategoryRepo, tCategoryRequest } from "../interfaces";

export const createCategoryService = async (
  payload: tCategoryRequest
): Promise<Category> => {
  const categoriesRepository: tCategoryRepo =
    AppDataSource.getRepository(Category);

  const exists: boolean = await categoriesRepository.exist({
    where: { name: payload.name },
  });

  if (exists) {
    throw new AppError("Category already exists", 409);
  }

  const newCategory: Category = await categoriesRepository.save(payload);

  return newCategory;
};

export const listAllCategoriesService = async (): Promise<Category[]> => {
  const categoriesRepository: tCategoryRepo =
    AppDataSource.getRepository(Category);

  const categories: Category[] = await categoriesRepository.find();

  return categories;
};

export const listCategoryRealEstatesService = async (
  id: number
): Promise<Category> => {
  const categoriesRepository: tCategoryRepo =
    AppDataSource.getRepository(Category);

  const categoryRealEstates: Category | null =
    await categoriesRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        realEstate: true,
      },
    });

  if (!categoryRealEstates) {
    throw new AppError("Category not found", 404);
  }

  return categoryRealEstates!;
};
