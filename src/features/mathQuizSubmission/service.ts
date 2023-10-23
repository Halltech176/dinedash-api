import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import {
  CreateMathQuizSubmissionDto,
  UpdateMathQuizSubmissionDto,
} from './dto';
import { MathQuizSubmission } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { MathQuizModel, MathQuizSubmissionModel } from '../../models';
import { savePoints } from '../../utilities/submit';
import { fetchQuestionByIds } from '../../utilities/submit';

export default class MathQuizSubmissionService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundMathQuizSubmissions;
      if (conditions) {
        foundMathQuizSubmissions = await find(
          MathQuizSubmissionModel,
          queries,
          conditions,
        );
      } else {
        foundMathQuizSubmissions = await find(MathQuizSubmissionModel, queries);
      }
      return {
        success: true,
        message: 'Math Quiz Submissions fetched successfully',
        data: foundMathQuizSubmissions,
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
    payload: CreateMathQuizSubmissionDto,
    data: Partial<MathQuizSubmission> = {},
  ): Promise<serviceResponseType<MathQuizSubmission>> {
    // return await MathQuizSubmissionModel.create(data);
    validateDTO(CreateMathQuizSubmissionDto, payload);
    try {
      const validationResults = await fetchQuestionByIds(
        MathQuizModel,
        payload,
      );
      const createdMathQuizSubmission = await MathQuizSubmissionModel.create({
        ...payload,
        questions: validationResults,
        ...data,
      });
      const points = createdMathQuizSubmission.questions.reduce((acc, curr) => {
        return acc + curr.points;
      }, 0);

      await savePoints(data.createdBy, points);

      return {
        success: true,
        message: 'Math Quiz Submission created successfully',
        data: createdMathQuizSubmission,
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
      let foundMathQuizSubmission;
      if (conditions) {
        foundMathQuizSubmission = await findOne(
          MathQuizSubmissionModel,
          queries,
          conditions,
        );
      } else {
        foundMathQuizSubmission = await findOne(
          MathQuizSubmissionModel,
          queries,
        );
      }
      return {
        success: true,
        message: 'Math Quiz Submission fetched successfully',
        data: foundMathQuizSubmission,
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
    data: Partial<UpdateMathQuizSubmissionDto>,
    others: UpdateQuery<MathQuizSubmission> & Partial<MathQuizSubmission> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<MathQuizSubmission | null>> {
    try {
      const updatedMathQuizSubmission =
        await MathQuizSubmissionModel.findOneAndUpdate(
          queries,
          { ...data, ...others },
          options,
        );
      if (!updatedMathQuizSubmission) {
        throw {
          message: 'Math Quiz Submission not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Math Quiz Submission updated successfully',
        data: updatedMathQuizSubmission,
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
  ): Promise<serviceResponseType<MathQuizSubmission | null>> {
    try {
      // const foundMathQuizSubmission = await findOne(MathQuizSubmissionModel, queries, {
      //   _id: id,
      // });
      // if (!foundMathQuizSubmission) {
      //   throw {
      //     message: 'Math Quiz Submission not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const deletedMathQuizSubmission =
        await MathQuizSubmissionModel.findOneAndDelete({
          ...queries,
          _id: id,
        });
      if (!deletedMathQuizSubmission) {
        throw {
          message: 'Math Quiz Submission not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Math Quiz Submission deleted successfully',
        data: deletedMathQuizSubmission,
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
