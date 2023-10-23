import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateDailyQuizDto, UpdateDailyQuizDto } from './dto';
import { DailyQuiz } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { DailyQuizModel } from '../../models';
import LanguageService from '../language/service';

export default class DailyQuizService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundDailyQuizs;
      if (conditions) {
        foundDailyQuizs = await find(DailyQuizModel, queries, conditions);
      } else {
        foundDailyQuizs = await find(DailyQuizModel, queries);
      }
      return {
        success: true,
        message: 'Daily Quizs fetched successfully',
        data: foundDailyQuizs,
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
    payload: CreateDailyQuizDto,
    data: Partial<DailyQuiz> = {},
  ): Promise<serviceResponseType<DailyQuiz>> {
    // return await DailyQuizModel.create(data);
    validateDTO(CreateDailyQuizDto, payload);
    try {
      const language = await LanguageService.fetchOne({
        name: payload.language,
      });

      if (language.data === null) {
        throw new Error('Please provide a valid language');
      }

      const createdDailyQuiz = await DailyQuizModel.create({
        ...payload,
        ...data,
      });
      return {
        success: true,
        message: 'Daily Quiz created successfully',
        data: createdDailyQuiz,
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
      let foundDailyQuiz;
      if (conditions) {
        foundDailyQuiz = await findOne(DailyQuizModel, queries, conditions);
      } else {
        foundDailyQuiz = await findOne(DailyQuizModel, queries);
      }
      return {
        success: true,
        message: 'Daily Quiz fetched successfully',
        data: foundDailyQuiz,
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
    data: Partial<UpdateDailyQuizDto>,
    others: UpdateQuery<DailyQuiz> & Partial<DailyQuiz> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<DailyQuiz | null>> {
    try {
      // const foundDailyQuiz = await findOne(DailyQuizModel, queries);
      // if (!foundDailyQuiz) {
      //   throw {
      //     message: 'Daily Quiz not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedDailyQuiz = await DailyQuizModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedDailyQuiz) {
        throw {
          message: 'Daily Quiz not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Daily Quiz updated successfully',
        data: updatedDailyQuiz,
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
  ): Promise<serviceResponseType<DailyQuiz | null>> {
    try {
      // const foundDailyQuiz = await findOne(DailyQuizModel, queries, {
      //   _id: id,
      // });
      // if (!foundDailyQuiz) {
      //   throw {
      //     message: 'Daily Quiz not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const deletedDailyQuiz = await DailyQuizModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedDailyQuiz) {
        throw {
          message: 'Daily Quiz not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Daily Quiz deleted successfully',
        data: deletedDailyQuiz,
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
