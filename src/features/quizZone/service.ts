import { Document, QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateQuizZoneDto, UpdateQuizZoneDto } from './dto';
import { QuizZone } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { QuizZoneModel, CategoryModel } from '../../models';
import { CreateCategoryDto } from '../category/dto';
import QuizSettingsService from '../quizSettings/service';

export default class QuizZoneService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    const _limit = await (
      await QuizSettingsService.fetch({ name: 'quizZone' })
    ).data.docs[0].questionPerQuiz;

    try {
      let foundQuizZones;
      if (conditions) {
        foundQuizZones = await find(
          QuizZoneModel,
          { ...queries, _limit },
          conditions,
        );
      } else {
        foundQuizZones = await find(QuizZoneModel, queries);
      }
      return {
        success: true,
        message: 'Quiz Zones fetched successfully',
        data: foundQuizZones,
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
    payload: CreateQuizZoneDto,
    data: Partial<QuizZone> = {},
  ): Promise<serviceResponseType<QuizZone & Document>> {
    // return await QuizZoneModel.create(data);

    validateDTO(CreateQuizZoneDto, payload);

    try {
      const createdQuizZone = await QuizZoneModel.create({
        ...payload,
        ...data,
      });

      return {
        success: true,
        message: 'Quiz Zone created successfully',
        data: createdQuizZone,
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
      let foundQuizZone;
      if (conditions) {
        foundQuizZone = await findOne(QuizZoneModel, queries, conditions);
      } else {
        foundQuizZone = await findOne(QuizZoneModel, queries);
      }
      return {
        success: true,
        message: 'Quiz Zone fetched successfully',
        data: foundQuizZone,
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
    data: Partial<UpdateQuizZoneDto>,
    others: UpdateQuery<QuizZone> & Partial<QuizZone> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<QuizZone | null>> {
    try {
      // const foundQuizZone = await findOne(QuizZoneModel, queries);
      // if (!foundQuizZone) {
      //   throw {
      //     message: 'Quiz Zone not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedQuizZone = await QuizZoneModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedQuizZone) {
        throw {
          message: 'Quiz Zone not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Quiz Zone updated successfully',
        data: updatedQuizZone,
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
  ): Promise<serviceResponseType<QuizZone | null>> {
    try {
      // const foundQuizZone = await findOne(QuizZoneModel, queries, {
      //   _id: id,
      // });
      // if (!foundQuizZone) {
      //   throw {
      //     message: 'Quiz Zone not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const deletedQuizZone = await QuizZoneModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedQuizZone) {
        throw {
          message: 'Quiz Zone not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Quiz Zone deleted successfully',
        data: deletedQuizZone,
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
