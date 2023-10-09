import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateQuizDto, UpdateQuizDto } from './dto';
import { Quiz } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { QuizModel } from '../../models';

export default class QuizService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundQuizs;
      if (conditions) {
        foundQuizs = await find(QuizModel, queries, conditions);
      } else {
        foundQuizs = await find(QuizModel, queries);
      }
      return {
        success: true,
        message: 'Quizs fetched successfully',
        data: foundQuizs,
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
    payload: CreateQuizDto,
    data: Partial<Quiz> = {},
  ): Promise<serviceResponseType<Quiz>> {
    // return await QuizModel.create(data);
    validateDTO(CreateQuizDto, payload);
    try {
      const createdQuiz = await QuizModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'Quiz created successfully',
        data: createdQuiz,
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
      let foundQuiz;
      if (conditions) {
        foundQuiz = await findOne(QuizModel, queries, conditions);
      } else {
        foundQuiz = await findOne(QuizModel, queries);
      }
      return {
        success: true,
        message: 'Quiz fetched successfully',
        data: foundQuiz,
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
    data: Partial<UpdateQuizDto>,
    others: UpdateQuery<Quiz> & Partial<Quiz> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<Quiz | null>> {
    try {
      // const foundQuiz = await findOne(QuizModel, queries);
      // if (!foundQuiz) {
      //   throw {
      //     message: 'Quiz not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedQuiz = await QuizModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedQuiz) {
        throw {
          message: 'Quiz not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Quiz updated successfully',
        data: updatedQuiz,
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
  ): Promise<serviceResponseType<Quiz | null>> {
    try {
      // const foundQuiz = await findOne(QuizModel, queries, {
      //   _id: id,
      // });
      // if (!foundQuiz) {
      //   throw {
      //     message: 'Quiz not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const deletedQuiz = await QuizModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedQuiz) {
        throw {
          message: 'Quiz not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Quiz deleted successfully',
        data: deletedQuiz,
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
