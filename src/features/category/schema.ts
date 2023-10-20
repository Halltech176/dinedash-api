import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { QuizZone } from '../quizZone/schema';
import { Types } from 'mongoose';
import { File } from '../file/schema';

export enum CategoryType {
  QUIZZONE = 'quizZone',
  FUNANDLEARN = 'funAndLearn',
  DAILYQUIZ = 'dailyQuiz',
  GUESSTHEWORD = 'guessTheWord',
  MATHQUIZ = 'mathQuiz',
  AUDIOQUIZ = 'audioQuiz',
  CONTEST = 'contest',
}

@plugin(mongooseIdValidator)
@pre<Category>('save', function (next) {
  this.name = this.name.toLowerCase();
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class Category {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: true, enum: CategoryType })
  type!: CategoryType;

  @prop({ required: true, unique: true })
  name!: string;

  @prop({ required: false, ref: () => File })
  image?: Ref<File>;

  @prop({ required: false, default: null, ref: () => Category })
  parentCategory?: Ref<Category>;

  @prop({ required: false, default: 'English' })
  language?: string;
}
