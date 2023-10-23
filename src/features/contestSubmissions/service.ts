import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import {
  CreateContestSubmissionsDto,
  UpdateContestSubmissionsDto,
} from './dto';
import { ContestSubmissions } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { ContestQuestionsModel, ContestSubmissionsModel } from '../../models';
import { fetchQuestionByIds } from '../../utilities/submit';
import { savePoints } from '../../utilities/submit';

export default class ContestSubmissionsService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundContestSubmissionss;
      if (conditions) {
        foundContestSubmissionss = await find(
          ContestSubmissionsModel,
          queries,
          conditions,
        );
      } else {
        foundContestSubmissionss = await find(ContestSubmissionsModel, queries);
      }
      return {
        success: true,
        message: 'Contest Submissionss fetched successfully',
        data: foundContestSubmissionss,
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
    payload: CreateContestSubmissionsDto,
    data: Partial<ContestSubmissions> = {},
  ): Promise<serviceResponseType<ContestSubmissions>> {
    // return await ContestSubmissionsModel.create(data);
    validateDTO(CreateContestSubmissionsDto, payload);
    try {
      const validationResults = await await fetchQuestionByIds(
        ContestQuestionsModel,
        payload,
      );

      const createdContestSubmissions = await ContestSubmissionsModel.create({
        ...payload,
        questions: validationResults,
        ...data,
      });

      const points = createdContestSubmissions.questions.reduce((acc, curr) => {
        return acc + curr.points;
      }, 0);

      await savePoints(data.createdBy, points);
      return {
        success: true,
        message: 'Contest Submissions created successfully',
        data: createdContestSubmissions,
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
      let foundContestSubmissions;
      if (conditions) {
        foundContestSubmissions = await findOne(
          ContestSubmissionsModel,
          queries,
          conditions,
        );
      } else {
        foundContestSubmissions = await findOne(
          ContestSubmissionsModel,
          queries,
        );
      }
      return {
        success: true,
        message: 'Contest Submissions fetched successfully',
        data: foundContestSubmissions,
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
    data: Partial<UpdateContestSubmissionsDto>,
    others: UpdateQuery<ContestSubmissions> & Partial<ContestSubmissions> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<ContestSubmissions | null>> {
    try {
      // const foundContestSubmissions = await findOne(ContestSubmissionsModel, queries);
      // if (!foundContestSubmissions) {
      //   throw {
      //     message: 'Contest Submissions not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedContestSubmissions =
        await ContestSubmissionsModel.findOneAndUpdate(
          queries,
          { ...data, ...others },
          options,
        );
      if (!updatedContestSubmissions) {
        throw {
          message: 'Contest Submissions not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Contest Submissions updated successfully',
        data: updatedContestSubmissions,
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
  ): Promise<serviceResponseType<ContestSubmissions | null>> {
    try {
      // const foundContestSubmissions = await findOne(ContestSubmissionsModel, queries, {
      //   _id: id,
      // });
      // if (!foundContestSubmissions) {
      //   throw {
      //     message: 'Contest Submissions not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const deletedContestSubmissions =
        await ContestSubmissionsModel.findOneAndDelete({
          ...queries,
          _id: id,
        });
      if (!deletedContestSubmissions) {
        throw {
          message: 'Contest Submissions not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Contest Submissions deleted successfully',
        data: deletedContestSubmissions,
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
