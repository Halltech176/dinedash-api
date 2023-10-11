import { DocumentType, getModelForClass } from '@typegoose/typegoose';
import { Profile } from './profileModel';
import { File } from '../features/file/schema';
import { Language } from '../features/language/schema';
import { Quiz } from '../features/quiz/schema';
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
export const LanguageModel = getModelForClass(Language);
export const QuizModel = getModelForClass(Quiz);
export const QuestionModel = getModelForClass(Question);
export const CategoryModel = getModelForClass(Category);
export const QuizZoneModel = getModelForClass(QuizZone);
export const FileModel = getModelForClass(File);
export const TokenModel = getModelForClass(Token);
