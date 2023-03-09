import { AppDataSource } from "../data-source";
import { Address, Category, RealEstate } from "../entities";
import { AppError } from "../errors";
import {
  tAddressRepo,
  tCategoryRepo,
  tRealEstateRepo,
  tRealEstateRequest,
} from "../interfaces";

export const createRealEstateService = async (
  payload: tRealEstateRequest
): Promise<RealEstate> => {
  const addressesRepository: tAddressRepo =
    AppDataSource.getRepository(Address);

  const exists: boolean = await addressesRepository.exist({
    where: {
      zipCode: payload.address.zipCode,
      number: payload.address.number!,
    },
  });

  if (exists) {
    throw new AppError("Address already exists", 409);
  }

  const address: Address = await addressesRepository.save(payload.address);

  const categoriesRepository: tCategoryRepo =
    AppDataSource.getRepository(Category);

  const category: Category | null = await categoriesRepository.findOneBy({
    id: payload.categoryId,
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const realEstateRepository: tRealEstateRepo =
    AppDataSource.getRepository(RealEstate);

  const newRealEstateData: RealEstate = realEstateRepository.create({
    ...payload,
    address: address,
    category: category,
  });

  const newRealEstate: RealEstate = await realEstateRepository.save(
    newRealEstateData
  );

  return newRealEstate;
};

export const listAllRealEstatesService = async (): Promise<RealEstate[]> => {
  const realEstateRepository: tRealEstateRepo =
    AppDataSource.getRepository(RealEstate);

  const realEstates: RealEstate[] = await realEstateRepository.find({
    relations: {
      address: true,
    },
  });

  return realEstates;
};
