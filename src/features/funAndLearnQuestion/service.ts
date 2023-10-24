import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import {
  CreateFunAndLearnQuestionDto,
  UpdateFunAndLearnQuestionDto,
} from './dto';
import { FunAndLearnQuestion } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { FunAndLearnQuestionModel } from '../../models';
import { Model } from 'mongoose';
import QuizSettingsService from '../quizSettings/service';

export default class FunAndLearnQuestionService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      const _limit = await (
        await QuizSettingsService.fetch({ name: 'funAndLearn' })
      ).data.docs[0]?.questionPerQuiz;

      let foundFunAndLearnQuestions;

      if (conditions) {
        foundFunAndLearnQuestions = await find(
          FunAndLearnQuestionModel,
          { ...queries, _limit },
          conditions,
        );
      } else {
        foundFunAndLearnQuestions = await find(
          FunAndLearnQuestionModel,
          queries,
        );
      }
      return {
        success: true,
        message: 'FunAndLearnQuestions fetched successfully',
        data: foundFunAndLearnQuestions,
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
    payload: CreateFunAndLearnQuestionDto,
    data: Partial<FunAndLearnQuestion> = {},
  ): Promise<serviceResponseType<FunAndLearnQuestion>> {
    // return await FunAndLearnQuestionModel.create(data);
    validateDTO(CreateFunAndLearnQuestionDto, payload);
    try {
      const createdFunAndLearnQuestion = await FunAndLearnQuestionModel.create({
        ...payload,
        ...data,
      });
      return {
        success: true,
        message: 'FunAndLearnQuestion created successfully',
        data: createdFunAndLearnQuestion,
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
      let foundFunAndLearnQuestion;
      if (conditions) {
        foundFunAndLearnQuestion = await findOne(
          FunAndLearnQuestionModel,
          queries,
          conditions,
        );
      } else {
        foundFunAndLearnQuestion = await findOne(
          FunAndLearnQuestionModel,
          queries,
        );
      }
      return {
        success: true,
        message: 'FunAndLearnQuestion fetched successfully',
        data: foundFunAndLearnQuestion,
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
    data: Partial<UpdateFunAndLearnQuestionDto>,
    others: UpdateQuery<FunAndLearnQuestion> &
      Partial<FunAndLearnQuestion> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<FunAndLearnQuestion | null>> {
    try {
      // const foundFunAndLearnQuestion = await findOne(FunAndLearnQuestionModel, queries);
      // if (!foundFunAndLearnQuestion) {
      //   throw {
      //     message: 'FunAndLearnQuestion not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedFunAndLearnQuestion =
        await FunAndLearnQuestionModel.findOneAndUpdate(
          queries,
          { ...data, ...others },
          options,
        );
      if (!updatedFunAndLearnQuestion) {
        throw {
          message: 'FunAndLearnQuestion not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'FunAndLearnQuestion updated successfully',
        data: updatedFunAndLearnQuestion,
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
  ): Promise<serviceResponseType<FunAndLearnQuestion | null>> {
    try {
      // const foundFunAndLearnQuestion = await findOne(FunAndLearnQuestionModel, queries, {
      //   _id: id,
      // });
      // if (!foundFunAndLearnQuestion) {
      //   throw {
      //     message: 'FunAndLearnQuestion not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const deletedFunAndLearnQuestion =
        await FunAndLearnQuestionModel.findOneAndDelete({
          ...queries,
          _id: id,
        });
      if (!deletedFunAndLearnQuestion) {
        throw {
          message: 'FunAndLearnQuestion not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'FunAndLearnQuestion deleted successfully',
        data: deletedFunAndLearnQuestion,
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
