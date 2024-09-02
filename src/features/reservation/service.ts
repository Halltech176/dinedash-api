import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateReservationDto, UpdateReservationDto } from './dto';
import { Reservation } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { ReservationModel } from '../../models';

export default class ReservationService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundReservations;
      if (conditions) {
        foundReservations = await find(ReservationModel, queries, conditions);
      }
      else {
      foundReservations = await find(ReservationModel, queries);
      }
      return {
        success: true,
        message: 'Reservations fetched successfully',
        data: foundReservations,
        statusCode: 200,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: error,
      };
    }
  }

  static async create(
    payload: CreateReservationDto,
    data: Partial<Reservation> = {},
  ): Promise<serviceResponseType<Reservation>> {
    // return await ReservationModel.create(data);
    validateDTO(CreateReservationDto, payload);
    try {
      const createdReservation = await ReservationModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'Reservation created successfully',
        data: createdReservation,
        statusCode: 201,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: error,
      };
    }
  }

  static async fetchOne(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundReservation;
      if (conditions) {
        foundReservation = await findOne(ReservationModel, queries, conditions);
      }
      else {
      foundReservation = await findOne(ReservationModel, queries);
      }
      return {
        success: true,
        message: 'Reservation fetched successfully',
        data: foundReservation,
        statusCode: 200,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: error,
      };
    }
  }

  static async updateOne(
    queries: { [key: string]: any; _id: string },
    data: Partial< UpdateReservationDto>,
    others: UpdateQuery<Reservation> & Partial<Reservation> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<Reservation | null>> {
    try {
      // const foundReservation = await findOne(ReservationModel, queries);
      // if (!foundReservation) {
      //   throw {
      //     message: 'Reservation not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedReservation = await ReservationModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedReservation) {
        throw {
          message: 'Reservation not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Reservation updated successfully',
        data: updatedReservation,
        statusCode: 200,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: error,
      };
    }
  }

  static async deleteOne(
    id: string,
    queries: { [key: string]: any },
  ): Promise<serviceResponseType<Reservation | null>> {
    try {
      // const foundReservation = await findOne(ReservationModel, queries, {
      //   _id: id,
      // });
      // if (!foundReservation) {
      //   throw {
      //     message: 'Reservation not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const deletedReservation = await ReservationModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedReservation) {
        throw {
          message: 'Reservation not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Reservation deleted successfully',
        data: deletedReservation,
        statusCode: 204,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: error,
      };
    }
  }
}
