import { Model, Types } from 'mongoose';
import { ProfileModel } from '../models';

interface Payload {
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

export const savePoints = async (userId: Types.ObjectId, points: number) => {
  const profile = await ProfileModel.findOne({ createdBy: userId });
  if (!profile || profile.points === undefined)
    throw new Error('Profile not found');
  profile.points += points;
  await profile.save();
};
