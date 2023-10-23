import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateContestDto, UpdateContestDto } from './dto';
import { Contest } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { ContestModel } from '../../models';

export default class ContestService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundContests;
      if (conditions) {
        foundContests = await find(ContestModel, queries, conditions);
      } else {
        foundContests = await find(ContestModel, queries);
      }
      return {
        success: true,
        message: 'Contests fetched successfully',
        data: foundContests,
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
    payload: CreateContestDto,
    data: Partial<Contest> = {},
  ): Promise<serviceResponseType<Contest>> {
    // return await ContestModel.create(data);
    validateDTO(CreateContestDto, payload);
    try {
      const createdContest = await ContestModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'Contest created successfully',
        data: createdContest,
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
      let foundContest;
      if (conditions) {
        foundContest = await findOne(ContestModel, queries, conditions);
      } else {
        foundContest = await findOne(ContestModel, queries);
      }
      return {
        success: true,
        message: 'Contest fetched successfully',
        data: foundContest,
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
    data: Partial<UpdateContestDto>,
    others: UpdateQuery<Contest> & Partial<Contest> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<Contest | null>> {
    try {
      // const foundContest = await findOne(ContestModel, queries);
      // if (!foundContest) {
      //   throw {
      //     message: 'Contest not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedContest = await ContestModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedContest) {
        throw {
          message: 'Contest not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Contest updated successfully',
        data: updatedContest,
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
  ): Promise<serviceResponseType<Contest | null>> {
    try {
      // const foundContest = await findOne(ContestModel, queries, {
      //   _id: id,
      // });
      // if (!foundContest) {
      //   throw {
      //     message: 'Contest not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const deletedContest = await ContestModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedContest) {
        throw {
          message: 'Contest not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Contest deleted successfully',
        data: deletedContest,
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
