import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateAudioQuizDto, UpdateAudioQuizDto } from './dto';
import { AudioQuiz } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { AudioQuizModel } from '../../models';

export default class AudioQuizService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundAudioQuizs;
      if (conditions) {
        foundAudioQuizs = await find(AudioQuizModel, queries, conditions);
      } else {
        foundAudioQuizs = await find(AudioQuizModel, queries);
      }
      return {
        success: true,
        message: 'Audio Quizs fetched successfully',
        data: foundAudioQuizs,
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
    payload: CreateAudioQuizDto,
    data: Partial<AudioQuiz> = {},
  ): Promise<serviceResponseType<AudioQuiz>> {
    // return await AudioQuizModel.create(data);
    validateDTO(CreateAudioQuizDto, payload);
    try {
      const createdAudioQuiz = await AudioQuizModel.create({
        ...payload,
        ...data,
      });
      return {
        success: true,
        message: 'Audio Quiz created successfully',
        data: createdAudioQuiz,
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
      let foundAudioQuiz;
      if (conditions) {
        foundAudioQuiz = await findOne(AudioQuizModel, queries, conditions);
      } else {
        foundAudioQuiz = await findOne(AudioQuizModel, queries);
      }
      return {
        success: true,
        message: 'Audio Quiz fetched successfully',
        data: foundAudioQuiz,
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
    data: Partial<UpdateAudioQuizDto>,
    others: UpdateQuery<AudioQuiz> & Partial<AudioQuiz> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<AudioQuiz | null>> {
    try {
      // const foundAudioQuiz = await findOne(AudioQuizModel, queries);
      // if (!foundAudioQuiz) {
      //   throw {
      //     message: 'Audio Quiz not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedAudioQuiz = await AudioQuizModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedAudioQuiz) {
        throw {
          message: 'Audio Quiz not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Audio Quiz updated successfully',
        data: updatedAudioQuiz,
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
  ): Promise<serviceResponseType<AudioQuiz | null>> {
    try {
      // const foundAudioQuiz = await findOne(AudioQuizModel, queries, {
      //   _id: id,
      // });
      // if (!foundAudioQuiz) {
      //   throw {
      //     message: 'Audio Quiz not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const deletedAudioQuiz = await AudioQuizModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedAudioQuiz) {
        throw {
          message: 'Audio Quiz not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Audio Quiz deleted successfully',
        data: deletedAudioQuiz,
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
