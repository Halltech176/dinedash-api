import { ProfileModel } from '../models';

export const savePoints = async (userId: any, points: number) => {
  const profile = await ProfileModel.findOne({ createdBy: userId });
  if (!profile || profile.points === undefined)
    throw new Error('Profile not found');
  profile.points += points;
  await profile.save();
};
