import { AppDataSource } from "../data-source";
import { RealEstate, Schedule, User } from "../entities";
import { AppError } from "../errors";
import {
  tRealEstateRepo,
  tScheduleRepo,
  tScheduleRequest,
  tUserRepo,
} from "../interfaces";

export const createScheduleService = async (
  payload: tScheduleRequest,
  userId: number
): Promise<void> => {
  const realEstateRepository: tRealEstateRepo =
    AppDataSource.getRepository(RealEstate);

  const realEstate: RealEstate | null = await realEstateRepository.findOne({
    where: {
      id: payload.realEstateId,
    },
  });

  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const usersRepository: tUserRepo = AppDataSource.getRepository(User);

  const user: User | null = await usersRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const schedulesRepository: tScheduleRepo =
    AppDataSource.getRepository(Schedule);

  const scheduleQueryBuilder =
    schedulesRepository.createQueryBuilder("schedule");

  const scheduleExists: boolean = await scheduleQueryBuilder
    .select("schedule")
    .where("schedule.date = :date", { date: payload.date })
    .andWhere("schedule.hour = :hour", { hour: payload.hour })
    .andWhere("schedule.realEstateId = :realEstateId", {
      realEstateId: payload.realEstateId,
    })
    .getExists();

  if (scheduleExists) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  const userHaveASchedule: boolean = await scheduleQueryBuilder
    .select("schedule")
    .where("schedule.userId = :userId", { userId: userId })
    .andWhere("schedule.date = :date", { date: payload.date })
    .andWhere("schedule.hour = :hour", { hour: payload.hour })
    .getExists();

  if (userHaveASchedule) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  const startHourInMinutes: number = 8 * 60;
  const finishHourInMinutes: number = 18 * 60;

  const scheduleHour = payload.hour.split(":");
  const scheduleHourInMinutes: number =
    Number(scheduleHour[0]) * 60 + Number(scheduleHour[1]);

  if (
    scheduleHourInMinutes < startHourInMinutes ||
    scheduleHourInMinutes > finishHourInMinutes
  ) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const scheduleDayOfTheWeek: number = new Date(payload.date).getDay();

  if (scheduleDayOfTheWeek === 0 || scheduleDayOfTheWeek === 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  const newScheduleData: Schedule = schedulesRepository.create({
    ...payload,
    realEstate: realEstate,
    user: user,
  });

  await schedulesRepository.save(newScheduleData);
};

export const listSchedulesService = async (
  realEstateId: number
): Promise<RealEstate> => {
  const realEstateRepository: tRealEstateRepo =
    AppDataSource.getRepository(RealEstate);

  const realEstateQueryBuilder =
    realEstateRepository.createQueryBuilder("real_estate");

  const realEstateSchedules: RealEstate | null = await realEstateQueryBuilder
    .leftJoinAndSelect("real_estate.address", "address")
    .leftJoinAndSelect("real_estate.category", "category")
    .leftJoinAndSelect("real_estate.schedules", "schedules")
    .leftJoinAndSelect("schedules.user", "user")
    .where("real_estate.id = :id", { id: realEstateId })
    .getOne();

  if (!realEstateSchedules) {
    throw new AppError("RealEstate not found", 404);
  }

  return realEstateSchedules;
};
