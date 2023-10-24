import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import {
  CreateQuessTheWordSubmissionDto,
  UpdateQuessTheWordSubmissionDto,
} from './dto';
import { QuessTheWordSubmission } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { QuessTheWordModel, QuessTheWordSubmissionModel } from '../../models';
import { Model } from 'mongoose';
import { Payload } from '../../utilities/submit';
import { savePoints } from '../../utilities/submit';

const fetchQuestionByIds = async <T>(model: Model<T>, payload: Payload) => {
  try {
    const questionIds = payload.questions.map(
      (question) => question.questionID,
    );

    const answeredQuestions: any = await model.find({
      _id: { $in: questionIds },
    });

    const validationResults = answeredQuestions.map((question: any) => {
      const correct =
        question.answer ==
        payload.questions.find(
          (q) =>
            q.questionID.toString().trim() == question._id.toString().trim(),
        )?.answer;

      const points = correct ? question.points : 0;

      return {
        option: payload.questions.find(
          (data) => data.questionID == question._id,
        )?.option,
        questionID: question._id,
        correct,
        points,
      };
    });

    return validationResults;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default class QuessTheWordSubmissionService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundQuessTheWordSubmissions;
      if (conditions) {
        foundQuessTheWordSubmissions = await find(
          QuessTheWordSubmissionModel,
          queries,
          conditions,
        );
      } else {
        foundQuessTheWordSubmissions = await find(
          QuessTheWordSubmissionModel,
          queries,
        );
      }
      return {
        success: true,
        message: 'Quess The Word Submissions fetched successfully',
        data: foundQuessTheWordSubmissions,
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
    payload: CreateQuessTheWordSubmissionDto,
    data: Partial<QuessTheWordSubmission> = {},
  ): Promise<serviceResponseType<QuessTheWordSubmission>> {
    // return await QuessTheWordSubmissionModel.create(data);
    validateDTO(CreateQuessTheWordSubmissionDto, payload);
    try {
      const validationResults = await fetchQuestionByIds(
        QuessTheWordModel,
        payload,
      );
      const createdQuessTheWordSubmission =
        await QuessTheWordSubmissionModel.create({
          ...payload,
          questions: validationResults,
          ...data,
        });

      const points = createdQuessTheWordSubmission.questions.reduce(
        (acc, curr) => {
          return acc + curr.points;
        },
        0,
      );

      await savePoints(data.createdBy, points);

      return {
        success: true,
        message: 'Quess The Word Submission created successfully',
        data: createdQuessTheWordSubmission,
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
      let foundQuessTheWordSubmission;
      if (conditions) {
        foundQuessTheWordSubmission = await findOne(
          QuessTheWordSubmissionModel,
          queries,
          conditions,
        );
      } else {
        foundQuessTheWordSubmission = await findOne(
          QuessTheWordSubmissionModel,
          queries,
        );
      }
      return {
        success: true,
        message: 'Quess The Word Submission fetched successfully',
        data: foundQuessTheWordSubmission,
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
    data: Partial<UpdateQuessTheWordSubmissionDto>,
    others: UpdateQuery<QuessTheWordSubmission> &
      Partial<QuessTheWordSubmission> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<QuessTheWordSubmission | null>> {
    try {
      // const foundQuessTheWordSubmission = await findOne(QuessTheWordSubmissionModel, queries);
      // if (!foundQuessTheWordSubmission) {
      //   throw {
      //     message: 'Quess The Word Submission not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedQuessTheWordSubmission =
        await QuessTheWordSubmissionModel.findOneAndUpdate(
          queries,
          { ...data, ...others },
          options,
        );
      if (!updatedQuessTheWordSubmission) {
        throw {
          message: 'Quess The Word Submission not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Quess The Word Submission updated successfully',
        data: updatedQuessTheWordSubmission,
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
  ): Promise<serviceResponseType<QuessTheWordSubmission | null>> {
    try {
      // const foundQuessTheWordSubmission = await findOne(QuessTheWordSubmissionModel, queries, {
      //   _id: id,
      // });
      // if (!foundQuessTheWordSubmission) {
      //   throw {
      //     message: 'Quess The Word Submission not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const deletedQuessTheWordSubmission =
        await QuessTheWordSubmissionModel.findOneAndDelete({
          ...queries,
          _id: id,
        });
      if (!deletedQuessTheWordSubmission) {
        throw {
          message: 'Quess The Word Submission not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Quess The Word Submission deleted successfully',
        data: deletedQuessTheWordSubmission,
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
