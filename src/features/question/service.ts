import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';
import { Question } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { QuestionModel } from '../../models';
import { Model } from 'mongoose';
import QuizSettingsService from '../quizSettings/service';

export interface Payload {
  questions: any[];
}

export const fetchQuestionByIds = async <T>(
  model: Model<T>,
  payload: Payload,
) => {
  try {
    const questionIds = payload.questions.map(
      (question) => question.questionID,
    );

    const answeredQuestions: any = await model.find({
      _id: { $in: questionIds },
    });

    const validationResults = answeredQuestions.map((question: any) => {
      const correct =
        question.correctOptionIndex ==
        payload.questions.find(
          (q) =>
            q.questionID.toString().trim() == question._id.toString().trim(),
        )?.option;

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

export default class QuestionService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      const _limit = await (
        await QuizSettingsService.fetch({ name: 'funAndLearn' })
      ).data.docs[0].questionPerQuiz;

      let foundQuestions;

      if (conditions) {
        foundQuestions = await find(
          QuestionModel,
          { ...queries, _limit },
          conditions,
        );
      } else {
        foundQuestions = await find(QuestionModel, queries);
      }
      return {
        success: true,
        message: 'Questions fetched successfully',
        data: foundQuestions,
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
    payload: CreateQuestionDto,
    data: Partial<Question> = {},
  ): Promise<serviceResponseType<Question>> {
    // return await QuestionModel.create(data);
    validateDTO(CreateQuestionDto, payload);
    try {
      const createdQuestion = await QuestionModel.create({
        ...payload,
        ...data,
      });
      return {
        success: true,
        message: 'Question created successfully',
        data: createdQuestion,
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
      let foundQuestion;
      if (conditions) {
        foundQuestion = await findOne(QuestionModel, queries, conditions);
      } else {
        foundQuestion = await findOne(QuestionModel, queries);
      }
      return {
        success: true,
        message: 'Question fetched successfully',
        data: foundQuestion,
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
    data: Partial<UpdateQuestionDto>,
    others: UpdateQuery<Question> & Partial<Question> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<Question | null>> {
    try {
      // const foundQuestion = await findOne(QuestionModel, queries);
      // if (!foundQuestion) {
      //   throw {
      //     message: 'Question not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedQuestion = await QuestionModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedQuestion) {
        throw {
          message: 'Question not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Question updated successfully',
        data: updatedQuestion,
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
  ): Promise<serviceResponseType<Question | null>> {
    try {
      // const foundQuestion = await findOne(QuestionModel, queries, {
      //   _id: id,
      // });
      // if (!foundQuestion) {
      //   throw {
      //     message: 'Question not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const deletedQuestion = await QuestionModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedQuestion) {
        throw {
          message: 'Question not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Question deleted successfully',
        data: deletedQuestion,
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
