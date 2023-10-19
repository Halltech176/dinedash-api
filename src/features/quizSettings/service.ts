import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateQuizSettingsDto, UpdateQuizSettingsDto } from './dto';
import { QuizSettings } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { QuizSettingsModel } from '../../models';

export default class QuizSettingsService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundQuizSettingss;
      if (conditions) {
        foundQuizSettingss = await find(QuizSettingsModel, queries, conditions);
      }
      else {
      foundQuizSettingss = await find(QuizSettingsModel, queries);
      }
      return {
        success: true,
        message: 'Quiz Settingss fetched successfully',
        data: foundQuizSettingss,
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
    payload: CreateQuizSettingsDto,
    data: Partial<QuizSettings> = {},
  ): Promise<serviceResponseType<QuizSettings>> {
    // return await QuizSettingsModel.create(data);
    validateDTO(CreateQuizSettingsDto, payload);
    try {
      const createdQuizSettings = await QuizSettingsModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'Quiz Settings created successfully',
        data: createdQuizSettings,
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
      let foundQuizSettings;
      if (conditions) {
        foundQuizSettings = await findOne(QuizSettingsModel, queries, conditions);
      }
      else {
      foundQuizSettings = await findOne(QuizSettingsModel, queries);
      }
      return {
        success: true,
        message: 'Quiz Settings fetched successfully',
        data: foundQuizSettings,
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
    data: Partial< UpdateQuizSettingsDto>,
    others: UpdateQuery<QuizSettings> & Partial<QuizSettings> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<QuizSettings | null>> {
    try {
      // const foundQuizSettings = await findOne(QuizSettingsModel, queries);
      // if (!foundQuizSettings) {
      //   throw {
      //     message: 'Quiz Settings not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedQuizSettings = await QuizSettingsModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedQuizSettings) {
        throw {
          message: 'Quiz Settings not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Quiz Settings updated successfully',
        data: updatedQuizSettings,
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
  ): Promise<serviceResponseType<QuizSettings | null>> {
    try {
      // const foundQuizSettings = await findOne(QuizSettingsModel, queries, {
      //   _id: id,
      // });
      // if (!foundQuizSettings) {
      //   throw {
      //     message: 'Quiz Settings not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const deletedQuizSettings = await QuizSettingsModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedQuizSettings) {
        throw {
          message: 'Quiz Settings not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Quiz Settings deleted successfully',
        data: deletedQuizSettings,
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
