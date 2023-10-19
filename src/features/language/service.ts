import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateLanguageDto, UpdateLanguageDto } from './dto';
import { Language } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { LanguageModel } from '../../models';

export default class LanguageService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundLanguages;
      if (conditions) {
        foundLanguages = await find(LanguageModel, queries, conditions);
      } else {
        foundLanguages = await find(LanguageModel, queries);
      }
      return {
        success: true,
        message: 'Languages fetched successfully',
        data: foundLanguages,
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
    payload: CreateLanguageDto,
    data: Partial<Language> = {},
  ): Promise<serviceResponseType<Language>> {
    // return await LanguageModel.create(data);
    validateDTO(CreateLanguageDto, payload);
    try {
      const createdLanguage = await LanguageModel.create({
        ...payload,
        ...data,
      });
      return {
        success: true,
        message: 'Language created successfully',
        data: createdLanguage,
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
      let foundLanguage;
      if (conditions) {
        foundLanguage = await findOne(LanguageModel, queries, conditions);
      } else {
        foundLanguage = await findOne(LanguageModel, queries);
      }
      return {
        success: true,
        message: 'Language fetched successfully',
        data: foundLanguage,
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
    data: Partial<UpdateLanguageDto>,
    others: UpdateQuery<Language> & Partial<Language> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<Language | null>> {
    try {
      // const foundLanguage = await findOne(LanguageModel, queries);
      // if (!foundLanguage) {
      //   throw {
      //     message: 'Language not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedLanguage = await LanguageModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedLanguage) {
        throw {
          message: 'Language not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Language updated successfully',
        data: updatedLanguage,
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
  ): Promise<serviceResponseType<Language | null>> {
    try {
      // const foundLanguage = await findOne(LanguageModel, queries, {
      //   _id: id,
      // });
      // if (!foundLanguage) {
      //   throw {
      //     message: 'Language not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const deletedLanguage = await LanguageModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedLanguage) {
        throw {
          message: 'Language not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Language deleted successfully',
        data: deletedLanguage,
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
