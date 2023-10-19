import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateFunAndLearnDto, UpdateFunAndLearnDto } from './dto';
import { FunAndLearn } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { FunAndLearnModel } from '../../models';

export default class FunAndLearnService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundFunAndLearns;
      if (conditions) {
        foundFunAndLearns = await find(FunAndLearnModel, queries, conditions);
      }
      else {
      foundFunAndLearns = await find(FunAndLearnModel, queries);
      }
      return {
        success: true,
        message: 'Fun And Learns fetched successfully',
        data: foundFunAndLearns,
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
    payload: CreateFunAndLearnDto,
    data: Partial<FunAndLearn> = {},
  ): Promise<serviceResponseType<FunAndLearn>> {
    // return await FunAndLearnModel.create(data);
    validateDTO(CreateFunAndLearnDto, payload);
    try {
      const createdFunAndLearn = await FunAndLearnModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'Fun And Learn created successfully',
        data: createdFunAndLearn,
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
      let foundFunAndLearn;
      if (conditions) {
        foundFunAndLearn = await findOne(FunAndLearnModel, queries, conditions);
      }
      else {
      foundFunAndLearn = await findOne(FunAndLearnModel, queries);
      }
      return {
        success: true,
        message: 'Fun And Learn fetched successfully',
        data: foundFunAndLearn,
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
    data: Partial< UpdateFunAndLearnDto>,
    others: UpdateQuery<FunAndLearn> & Partial<FunAndLearn> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<FunAndLearn | null>> {
    try {
      // const foundFunAndLearn = await findOne(FunAndLearnModel, queries);
      // if (!foundFunAndLearn) {
      //   throw {
      //     message: 'Fun And Learn not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedFunAndLearn = await FunAndLearnModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedFunAndLearn) {
        throw {
          message: 'Fun And Learn not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Fun And Learn updated successfully',
        data: updatedFunAndLearn,
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
  ): Promise<serviceResponseType<FunAndLearn | null>> {
    try {
      // const foundFunAndLearn = await findOne(FunAndLearnModel, queries, {
      //   _id: id,
      // });
      // if (!foundFunAndLearn) {
      //   throw {
      //     message: 'Fun And Learn not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const deletedFunAndLearn = await FunAndLearnModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedFunAndLearn) {
        throw {
          message: 'Fun And Learn not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Fun And Learn deleted successfully',
        data: deletedFunAndLearn,
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
