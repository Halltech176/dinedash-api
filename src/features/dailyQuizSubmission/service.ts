import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import {
  CreateDailyQuizSubmissionDto,
  UpdateDailyQuizSubmissionDto,
} from './dto';
import { DailyQuizSubmission } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { DailyQuizModel, DailyQuizSubmissionModel } from '../../models';
import { fetchQuestionByIds } from '../../utilities/submit';
import { savePoints } from '../../utilities/submit';

export default class DailyQuizSubmissionService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundDailyQuizSubmissions;
      if (conditions) {
        foundDailyQuizSubmissions = await find(
          DailyQuizSubmissionModel,
          queries,
          conditions,
        );
      } else {
        foundDailyQuizSubmissions = await find(
          DailyQuizSubmissionModel,
          queries,
        );
      }
      return {
        success: true,
        message: 'Daily Quiz Submissions fetched successfully',
        data: foundDailyQuizSubmissions,
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
    payload: CreateDailyQuizSubmissionDto,
    data: Partial<DailyQuizSubmission> = {},
  ): Promise<serviceResponseType<DailyQuizSubmission>> {
    // return await DailyQuizSubmissionModel.create(data);
    validateDTO(CreateDailyQuizSubmissionDto, payload);
    try {
      const validationResults = await fetchQuestionByIds(
        DailyQuizModel,
        payload,
      );

      const createdDailyQuizSubmission = await DailyQuizSubmissionModel.create({
        ...payload,
        questions: validationResults,
        ...data,
      });

      const points = createdDailyQuizSubmission.questions.reduce(
        (acc, curr) => {
          return acc + curr.points;
        },
        0,
      );

      await savePoints(data.createdBy, points);

      return {
        success: true,
        message: 'Daily Quiz Submission created successfully',
        data: createdDailyQuizSubmission,
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
      let foundDailyQuizSubmission;
      if (conditions) {
        foundDailyQuizSubmission = await findOne(
          DailyQuizSubmissionModel,
          queries,
          conditions,
        );
      } else {
        foundDailyQuizSubmission = await findOne(
          DailyQuizSubmissionModel,
          queries,
        );
      }
      return {
        success: true,
        message: 'Daily Quiz Submission fetched successfully',
        data: foundDailyQuizSubmission,
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
    data: Partial<UpdateDailyQuizSubmissionDto>,
    others: UpdateQuery<DailyQuizSubmission> &
      Partial<DailyQuizSubmission> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<DailyQuizSubmission | null>> {
    try {
      // const foundDailyQuizSubmission = await findOne(DailyQuizSubmissionModel, queries);
      // if (!foundDailyQuizSubmission) {
      //   throw {
      //     message: 'Daily Quiz Submission not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedDailyQuizSubmission =
        await DailyQuizSubmissionModel.findOneAndUpdate(
          queries,
          { ...data, ...others },
          options,
        );
      if (!updatedDailyQuizSubmission) {
        throw {
          message: 'Daily Quiz Submission not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Daily Quiz Submission updated successfully',
        data: updatedDailyQuizSubmission,
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
  ): Promise<serviceResponseType<DailyQuizSubmission | null>> {
    try {
      // const foundDailyQuizSubmission = await findOne(DailyQuizSubmissionModel, queries, {
      //   _id: id,
      // });
      // if (!foundDailyQuizSubmission) {
      //   throw {
      //     message: 'Daily Quiz Submission not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const deletedDailyQuizSubmission =
        await DailyQuizSubmissionModel.findOneAndDelete({
          ...queries,
          _id: id,
        });
      if (!deletedDailyQuizSubmission) {
        throw {
          message: 'Daily Quiz Submission not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Daily Quiz Submission deleted successfully',
        data: deletedDailyQuizSubmission,
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
