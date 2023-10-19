import { DocumentType, getModelForClass } from '@typegoose/typegoose';
import { Profile } from './profileModel';
import { File } from '../features/file/schema';
import { ContestQuestions } from '../features/contestQuestions/schema';
import { ContestSubmissions } from '../features/contestSubmissions/schema';
import { Contest } from '../features/contest/schema';
import { QuizSettings } from '../features/quizSettings/schema';
import { FunAndLearnSubmission } from '../features/funAndLearnSubmission/schema';
import { QuizZoneSubmission } from '../features/QuizZoneSubmission/schema';
import { FunAndLearn } from '../features/funAndLearn/schema';
import { Language } from '../features/language/schema';
import { Question } from '../features/question/schema';
import { Category } from '../features/category/schema';
import { QuizZone } from '../features/quizZone/schema';
import { Token } from './token';
import { User } from './userModel';
import { PassportLocalModel } from 'mongoose';

const UserMod = getModelForClass(User);
export type UserModelType = typeof UserMod &
  PassportLocalModel<DocumentType<User>>;
export const UserModel = UserMod as UserModelType;
export const ProfileModel = getModelForClass(Profile);
export const ContestQuestionsModel = getModelForClass(ContestQuestions);
export const ContestSubmissionsModel = getModelForClass(ContestSubmissions);
export const ContestModel = getModelForClass(Contest);
export const QuizSettingsModel = getModelForClass(QuizSettings);
export const FunAndLearnSubmissionModel = getModelForClass(
  FunAndLearnSubmission,
);
export const QuizZoneSubmissionModel = getModelForClass(QuizZoneSubmission);
export const FunAndLearnModel = getModelForClass(FunAndLearn);
export const LanguageModel = getModelForClass(Language);
export const QuestionModel = getModelForClass(Question);
export const CategoryModel = getModelForClass(Category);
export const QuizZoneModel = getModelForClass(QuizZone);
export const FileModel = getModelForClass(File);
export const TokenModel = getModelForClass(Token);
