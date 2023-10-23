import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateQuessTheWordDto, UpdateQuessTheWordDto } from './dto';
import { QuessTheWord } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { QuessTheWordModel } from '../../models';
import LanguageService from '../language/service';

export default class QuessTheWordService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundQuessTheWords;
      if (conditions) {
        foundQuessTheWords = await find(QuessTheWordModel, queries, conditions);
      } else {
        foundQuessTheWords = await find(QuessTheWordModel, queries);
      }
      return {
        success: true,
        message: 'Quess The Words fetched successfully',
        data: foundQuessTheWords,
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
    payload: CreateQuessTheWordDto,
    data: Partial<QuessTheWord> = {},
  ): Promise<serviceResponseType<QuessTheWord>> {
    // return await QuessTheWordModel.create(data);
    validateDTO(CreateQuessTheWordDto, payload);
    try {
      const language = await LanguageService.fetchOne({
        name: payload.language,
      });

      if (language.data === null) {
        throw new Error('Please provide a valid language');
      }
      const createdQuessTheWord = await QuessTheWordModel.create({
        ...payload,
        ...data,
      });
      return {
        success: true,
        message: 'Quess The Word created successfully',
        data: createdQuessTheWord,
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
      let foundQuessTheWord;
      if (conditions) {
        foundQuessTheWord = await findOne(
          QuessTheWordModel,
          queries,
          conditions,
        );
      } else {
        foundQuessTheWord = await findOne(QuessTheWordModel, queries);
      }
      return {
        success: true,
        message: 'Quess The Word fetched successfully',
        data: foundQuessTheWord,
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
    data: Partial<UpdateQuessTheWordDto>,
    others: UpdateQuery<QuessTheWord> & Partial<QuessTheWord> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<QuessTheWord | null>> {
    try {
      // const foundQuessTheWord = await findOne(QuessTheWordModel, queries);
      // if (!foundQuessTheWord) {
      //   throw {
      //     message: 'Quess The Word not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedQuessTheWord = await QuessTheWordModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedQuessTheWord) {
        throw {
          message: 'Quess The Word not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Quess The Word updated successfully',
        data: updatedQuessTheWord,
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
  ): Promise<serviceResponseType<QuessTheWord | null>> {
    try {
      // const foundQuessTheWord = await findOne(QuessTheWordModel, queries, {
      //   _id: id,
      // });
      // if (!foundQuessTheWord) {
      //   throw {
      //     message: 'Quess The Word not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const deletedQuessTheWord = await QuessTheWordModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedQuessTheWord) {
        throw {
          message: 'Quess The Word not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Quess The Word deleted successfully',
        data: deletedQuessTheWord,
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
