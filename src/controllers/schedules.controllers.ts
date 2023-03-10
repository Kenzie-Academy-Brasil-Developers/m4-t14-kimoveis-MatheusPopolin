import { Request, Response } from "express";
import { RealEstate, Schedule } from "../entities";
import { createScheduleService, listSchedulesService } from "../services";

export const createScheduleController = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    await createScheduleService(request.body, request.user.id);
  
    return response.status(201).json({message: "Schedule created"});
  };
  
  export const listSchedulesController = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const realEstateSchedules: RealEstate = await listSchedulesService(Number(request.params.id));
  
    return response.status(200).json(realEstateSchedules);
  };
  