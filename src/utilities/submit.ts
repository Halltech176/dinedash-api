import { ProfileModel, QuizSettingsModel } from '../models';
import { Model } from 'mongoose';

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

export const savePoints = async (userId: any, points: number) => {
  const profile = await ProfileModel.findOne({ createdBy: userId });
  if (!profile || profile.points === undefined)
    throw new Error('Profile not found');
  profile.points += points;
  await profile.save();
};

export const UpdateLevel = async (userId: any, results: [], name: string) => {
  const profile = await ProfileModel.findOne({ createdBy: userId });
  const settings = await QuizSettingsModel.findOne({ name });
  const percentage =
    (results.filter((result: any) => result.correct).length /
      settings?.questionPerQuiz!) *
    100;
  if (
    percentage >= (settings?.passPercentage ?? 0) &&
    (profile?.quizZoneLevel ?? 1) < 3
  ) {
    profile!.quizZoneLevel! += 1;
    await profile?.save();
  }
};
