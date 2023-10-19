import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import {
  CreateFunAndLearnSubmissionDto,
  UpdateFunAndLearnSubmissionDto,
} from './dto';
import { FunAndLearnSubmission } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { FunAndLearnSubmissionModel, QuestionModel } from '../../models';
import { fetchQuestionByIds } from '../question/service';
import { savePoints } from '../../utilities/submit';

export default class FunAndLearnSubmissionService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundFunAndLearnSubmissions;
      if (conditions) {
        foundFunAndLearnSubmissions = await find(
          FunAndLearnSubmissionModel,
          queries,
          conditions,
        );
      } else {
        foundFunAndLearnSubmissions = await find(
          FunAndLearnSubmissionModel,
          queries,
        );
      }
      return {
        success: true,
        message: 'Fun And Learn Submissions fetched successfully',
        data: foundFunAndLearnSubmissions,
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
    payload: CreateFunAndLearnSubmissionDto,
    data: Partial<FunAndLearnSubmission> = {},
  ): Promise<serviceResponseType<FunAndLearnSubmission>> {
    // return await FunAndLearnSubmissionModel.create(data);

    validateDTO(CreateFunAndLearnSubmissionDto, payload);
    try {
      const validationResults = await fetchQuestionByIds(
        QuestionModel,
        payload,
      );
      const createdFunAndLearnSubmission =
        await FunAndLearnSubmissionModel.create({
          ...payload,
          questions: validationResults,
          ...data,
        });

      const points = createdFunAndLearnSubmission.questions.reduce(
        (acc, curr) => {
          return acc + curr.points;
        },
        0,
      );

      await savePoints(data.createdBy, points);

      return {
        success: true,
        message: 'Fun And Learn Submission created successfully',
        data: createdFunAndLearnSubmission,
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
      let foundFunAndLearnSubmission;
      if (conditions) {
        foundFunAndLearnSubmission = await findOne(
          FunAndLearnSubmissionModel,
          queries,
          conditions,
        );
      } else {
        foundFunAndLearnSubmission = await findOne(
          FunAndLearnSubmissionModel,
          queries,
        );
      }
      return {
        success: true,
        message: 'Fun And Learn Submission fetched successfully',
        data: foundFunAndLearnSubmission,
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
    data: Partial<UpdateFunAndLearnSubmissionDto>,
    others: UpdateQuery<FunAndLearnSubmission> &
      Partial<FunAndLearnSubmission> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<FunAndLearnSubmission | null>> {
    try {
      // const foundFunAndLearnSubmission = await findOne(FunAndLearnSubmissionModel, queries);
      // if (!foundFunAndLearnSubmission) {
      //   throw {
      //     message: 'Fun And Learn Submission not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedFunAndLearnSubmission =
        await FunAndLearnSubmissionModel.findOneAndUpdate(
          queries,
          { ...data, ...others },
          options,
        );
      if (!updatedFunAndLearnSubmission) {
        throw {
          message: 'Fun And Learn Submission not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Fun And Learn Submission updated successfully',
        data: updatedFunAndLearnSubmission,
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
  ): Promise<serviceResponseType<FunAndLearnSubmission | null>> {
    try {
      // const foundFunAndLearnSubmission = await findOne(FunAndLearnSubmissionModel, queries, {
      //   _id: id,
      // });
      // if (!foundFunAndLearnSubmission) {
      //   throw {
      //     message: 'Fun And Learn Submission not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const deletedFunAndLearnSubmission =
        await FunAndLearnSubmissionModel.findOneAndDelete({
          ...queries,
          _id: id,
        });
      if (!deletedFunAndLearnSubmission) {
        throw {
          message: 'Fun And Learn Submission not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Fun And Learn Submission deleted successfully',
        data: deletedFunAndLearnSubmission,
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
