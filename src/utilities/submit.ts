import { ProfileModel, QuizSettingsModel } from '../models';

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
