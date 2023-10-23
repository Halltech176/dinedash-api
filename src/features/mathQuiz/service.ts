import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateMathQuizDto, UpdateMathQuizDto } from './dto';
import { MathQuiz } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { MathQuizModel } from '../../models';
import LanguageService from '../language/service';

export default class MathQuizService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundMathQuizs;
      if (conditions) {
        foundMathQuizs = await find(MathQuizModel, queries, conditions);
      } else {
        foundMathQuizs = await find(MathQuizModel, queries);
      }
      return {
        success: true,
        message: 'Math Quizs fetched successfully',
        data: foundMathQuizs,
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
    payload: CreateMathQuizDto,
    data: Partial<MathQuiz> = {},
  ): Promise<serviceResponseType<MathQuiz>> {
    // return await MathQuizModel.create(data);
    validateDTO(CreateMathQuizDto, payload);
    try {
      const language = await LanguageService.fetchOne({
        name: payload.language,
      });

      if (language.data === null) {
        throw new Error('Please provide a valid language');
      }
      const createdMathQuiz = await MathQuizModel.create({
        ...payload,
        ...data,
      });
      return {
        success: true,
        message: 'Math Quiz created successfully',
        data: createdMathQuiz,
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
      let foundMathQuiz;
      if (conditions) {
        foundMathQuiz = await findOne(MathQuizModel, queries, conditions);
      } else {
        foundMathQuiz = await findOne(MathQuizModel, queries);
      }
      return {
        success: true,
        message: 'Math Quiz fetched successfully',
        data: foundMathQuiz,
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
    data: Partial<UpdateMathQuizDto>,
    others: UpdateQuery<MathQuiz> & Partial<MathQuiz> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<MathQuiz | null>> {
    try {
      // const foundMathQuiz = await findOne(MathQuizModel, queries);
      // if (!foundMathQuiz) {
      //   throw {
      //     message: 'Math Quiz not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedMathQuiz = await MathQuizModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedMathQuiz) {
        throw {
          message: 'Math Quiz not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Math Quiz updated successfully',
        data: updatedMathQuiz,
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
  ): Promise<serviceResponseType<MathQuiz | null>> {
    try {
      // const foundMathQuiz = await findOne(MathQuizModel, queries, {
      //   _id: id,
      // });
      // if (!foundMathQuiz) {
      //   throw {
      //     message: 'Math Quiz not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const deletedMathQuiz = await MathQuizModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedMathQuiz) {
        throw {
          message: 'Math Quiz not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Math Quiz deleted successfully',
        data: deletedMathQuiz,
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
