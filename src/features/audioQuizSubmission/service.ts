import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import {
  CreateAudioQuizSubmissionDto,
  UpdateAudioQuizSubmissionDto,
} from './dto';
import { AudioQuizSubmission } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { AudioQuizModel, AudioQuizSubmissionModel } from '../../models';
import { fetchQuestionByIds } from '../question/service';
import { savePoints } from '../../utilities/submit';

export default class AudioQuizSubmissionService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundAudioQuizSubmissions;
      if (conditions) {
        foundAudioQuizSubmissions = await find(
          AudioQuizSubmissionModel,
          queries,
          conditions,
        );
      } else {
        foundAudioQuizSubmissions = await find(
          AudioQuizSubmissionModel,
          queries,
        );
      }
      return {
        success: true,
        message: 'Audio Quiz Submissions fetched successfully',
        data: foundAudioQuizSubmissions,
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
    payload: CreateAudioQuizSubmissionDto,
    data: Partial<AudioQuizSubmission> = {},
  ): Promise<serviceResponseType<AudioQuizSubmission>> {
    // return await AudioQuizSubmissionModel.create(data);
    validateDTO(CreateAudioQuizSubmissionDto, payload);
    try {
      const validationResults = await fetchQuestionByIds(
        AudioQuizModel,
        payload,
      );

      const createdAudioQuizSubmission = await AudioQuizSubmissionModel.create({
        ...payload,
        questions: validationResults,
        ...data,
      });

      const points = createdAudioQuizSubmission.questions.reduce(
        (acc, curr) => {
          return acc + curr.points;
        },
        0,
      );

      await savePoints(data.createdBy, points);

      return {
        success: true,
        message: 'Audio Quiz Submission created successfully',
        data: createdAudioQuizSubmission,
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
      let foundAudioQuizSubmission;
      if (conditions) {
        foundAudioQuizSubmission = await findOne(
          AudioQuizSubmissionModel,
          queries,
          conditions,
        );
      } else {
        foundAudioQuizSubmission = await findOne(
          AudioQuizSubmissionModel,
          queries,
        );
      }
      return {
        success: true,
        message: 'Audio Quiz Submission fetched successfully',
        data: foundAudioQuizSubmission,
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
    data: Partial<UpdateAudioQuizSubmissionDto>,
    others: UpdateQuery<AudioQuizSubmission> &
      Partial<AudioQuizSubmission> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<AudioQuizSubmission | null>> {
    try {
      // const foundAudioQuizSubmission = await findOne(AudioQuizSubmissionModel, queries);
      // if (!foundAudioQuizSubmission) {
      //   throw {
      //     message: 'Audio Quiz Submission not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedAudioQuizSubmission =
        await AudioQuizSubmissionModel.findOneAndUpdate(
          queries,
          { ...data, ...others },
          options,
        );
      if (!updatedAudioQuizSubmission) {
        throw {
          message: 'Audio Quiz Submission not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Audio Quiz Submission updated successfully',
        data: updatedAudioQuizSubmission,
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
  ): Promise<serviceResponseType<AudioQuizSubmission | null>> {
    try {
      // const foundAudioQuizSubmission = await findOne(AudioQuizSubmissionModel, queries, {
      //   _id: id,
      // });
      // if (!foundAudioQuizSubmission) {
      //   throw {
      //     message: 'Audio Quiz Submission not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const deletedAudioQuizSubmission =
        await AudioQuizSubmissionModel.findOneAndDelete({
          ...queries,
          _id: id,
        });
      if (!deletedAudioQuizSubmission) {
        throw {
          message: 'Audio Quiz Submission not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Audio Quiz Submission deleted successfully',
        data: deletedAudioQuizSubmission,
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
