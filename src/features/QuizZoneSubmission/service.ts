import { QueryOptions, Types, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import {
  CreateQuizZoneSubmissionDto,
  UpdateQuizZoneSubmissionDto,
} from './dto';
import { QuizZoneSubmission } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import {
  ProfileModel,
  QuizSettingsModel,
  QuizZoneModel,
  QuizZoneSubmissionModel,
} from '../../models';
import { Model } from 'mongoose';
import { fetchQuestionByIds } from '../question/service';
import { savePoints, UpdateLevel } from '../../utilities/submit';

export default class QuizZoneSubmissionService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundQuizZoneSubmissions;

      if (conditions) {
        foundQuizZoneSubmissions = await find(
          QuizZoneSubmissionModel,
          queries,
          conditions,
        );
      } else {
        foundQuizZoneSubmissions = await find(QuizZoneSubmissionModel, queries);
      }
      return {
        success: true,
        message: ' Quiz Zone Submissions fetched successfully',
        data: foundQuizZoneSubmissions,
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
    payload: CreateQuizZoneSubmissionDto,
    data: Partial<QuizZoneSubmission> = {},
  ): Promise<serviceResponseType<QuizZoneSubmission>> {
    // return await QuizZoneSubmissionModel.create(data);
    validateDTO(CreateQuizZoneSubmissionDto, payload);
    try {
      const validationResults = await await fetchQuestionByIds(
        QuizZoneModel,
        payload,
      );

      const createdQuizZoneSubmission = await QuizZoneSubmissionModel.create({
        ...payload,
        questions: validationResults,
        ...data,
      });

      const points = createdQuizZoneSubmission.questions.reduce((acc, curr) => {
        return acc + curr.points;
      }, 0);

      await savePoints(data.createdBy, points);
      await UpdateLevel(data.createdBy, validationResults, 'quizZone');

      return {
        success: true,
        message: ' Quiz Zone Submission created successfully',
        data: createdQuizZoneSubmission,
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
      let foundQuizZoneSubmission;
      if (conditions) {
        foundQuizZoneSubmission = await findOne(
          QuizZoneSubmissionModel,
          queries,
          conditions,
        );
      } else {
        foundQuizZoneSubmission = await findOne(
          QuizZoneSubmissionModel,
          queries,
        );
      }
      return {
        success: true,
        message: ' Quiz Zone Submission fetched successfully',
        data: foundQuizZoneSubmission,
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
    data: Partial<UpdateQuizZoneSubmissionDto>,
    others: UpdateQuery<QuizZoneSubmission> & Partial<QuizZoneSubmission> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<QuizZoneSubmission | null>> {
    try {
      // const foundQuizZoneSubmission = await findOne(QuizZoneSubmissionModel, queries);
      // if (!foundQuizZoneSubmission) {
      //   throw {
      //     message: ' Quiz Zone Submission not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedQuizZoneSubmission =
        await QuizZoneSubmissionModel.findOneAndUpdate(
          queries,
          { ...data, ...others },
          options,
        );
      if (!updatedQuizZoneSubmission) {
        throw {
          message: ' Quiz Zone Submission not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: ' Quiz Zone Submission updated successfully',
        data: updatedQuizZoneSubmission,
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
  ): Promise<serviceResponseType<QuizZoneSubmission | null>> {
    try {
      // const foundQuizZoneSubmission = await findOne(QuizZoneSubmissionModel, queries, {
      //   _id: id,
      // });
      // if (!foundQuizZoneSubmission) {
      //   throw {
      //     message: ' Quiz Zone Submission not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const deletedQuizZoneSubmission =
        await QuizZoneSubmissionModel.findOneAndDelete({
          ...queries,
          _id: id,
        });
      if (!deletedQuizZoneSubmission) {
        throw {
          message: ' Quiz Zone Submission not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: ' Quiz Zone Submission deleted successfully',
        data: deletedQuizZoneSubmission,
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
