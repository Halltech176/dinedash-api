import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { Category } from '../category/schema';

export enum QuestionType {
  QUIZZONE = 'quizZone',
  FUNANDLEARN = 'funAndLearn',
}

const requiredCategories = [QuestionType.QUIZZONE];

@plugin(mongooseIdValidator)
@pre<Question>('save', function (next) {
  if (requiredCategories.includes(this.type) && !this.category) {
    return next(new Error('Category is required'));
  }

  if (requiredCategories.includes(this.type) && !this.subCategory) {
    return next(new Error('Sub Category is required'));
  }
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class Question {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: true })
  question!: string;

  @prop({ required: true, enum: QuestionType })
  type!: QuestionType;

  @prop({ required: true, default: [] })
  options!: Array<number | string>;

  @prop({
    required: true,
    min: 1,
  })
  correctOptionIndex: number;

  @prop({ required: true, default: 10 })
  points?: number;

  @prop({ required: false, ref: () => Category })
  category?: Ref<Category>;

  @prop({ required: false, ref: () => Category })
  subCategory?: Ref<Category>;

  @prop({ required: true })
  answerDescription!: string;

  @prop({ required: false, default: 'English' })
  language?: string;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
