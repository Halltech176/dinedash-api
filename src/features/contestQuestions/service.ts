import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateContestQuestionsDto, UpdateContestQuestionsDto } from './dto';
import { ContestQuestions } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { ContestQuestionsModel } from '../../models';

export default class ContestQuestionsService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundContestQuestionss;
      if (conditions) {
        foundContestQuestionss = await find(
          ContestQuestionsModel,
          queries,
          conditions,
        );
      } else {
        foundContestQuestionss = await find(ContestQuestionsModel, queries);
      }
      return {
        success: true,
        message: 'Contest Questionss fetched successfully',
        data: foundContestQuestionss,
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
    payload: CreateContestQuestionsDto,
    data: Partial<ContestQuestions> = {},
  ): Promise<serviceResponseType<ContestQuestions>> {
    // return await ContestQuestionsModel.create(data);
    validateDTO(CreateContestQuestionsDto, payload);
    try {
      const createdContestQuestions = await ContestQuestionsModel.create({
        ...payload,
        ...data,
      });
      return {
        success: true,
        message: 'Contest Questions created successfully',
        data: createdContestQuestions,
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
      let foundContestQuestions;
      if (conditions) {
        foundContestQuestions = await findOne(
          ContestQuestionsModel,
          queries,
          conditions,
        );
      } else {
        foundContestQuestions = await findOne(ContestQuestionsModel, queries);
      }
      return {
        success: true,
        message: 'Contest Questions fetched successfully',
        data: foundContestQuestions,
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
    data: Partial<UpdateContestQuestionsDto>,
    others: UpdateQuery<ContestQuestions> & Partial<ContestQuestions> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<ContestQuestions | null>> {
    try {
      // const foundContestQuestions = await findOne(ContestQuestionsModel, queries);
      // if (!foundContestQuestions) {
      //   throw {
      //     message: 'Contest Questions not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedContestQuestions =
        await ContestQuestionsModel.findOneAndUpdate(
          queries,
          { ...data, ...others },
          options,
        );
      if (!updatedContestQuestions) {
        throw {
          message: 'Contest Questions not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Contest Questions updated successfully',
        data: updatedContestQuestions,
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
  ): Promise<serviceResponseType<ContestQuestions | null>> {
    try {
      // const foundContestQuestions = await findOne(ContestQuestionsModel, queries, {
      //   _id: id,
      // });
      // if (!foundContestQuestions) {
      //   throw {
      //     message: 'Contest Questions not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const deletedContestQuestions =
        await ContestQuestionsModel.findOneAndDelete({
          ...queries,
          _id: id,
        });
      if (!deletedContestQuestions) {
        throw {
          message: 'Contest Questions not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Contest Questions deleted successfully',
        data: deletedContestQuestions,
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
