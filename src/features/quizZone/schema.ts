import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { Category } from '../category/schema';
import errorHandler from '../../middlewares/errorHandler';
import mongoose from 'mongoose';

@plugin(mongooseIdValidator)
@pre<QuizZone>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;

  if (this.correctOptionIndex > this.options.length + 1) {
    return next(new Error('Correct option should be less than options length'));
  }

  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class QuizZone {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: true, ref: () => Category })
  category: Ref<Category>;

  @prop({ required: true, ref: () => Category })
  subCategory: Ref<Category>;

  @prop({ required: true })
  question!: string;

  @prop({ required: true, default: [] })
  options!: Array<number | string>;

  @prop({
    required: true,
    min: 1,
  })
  correctOptionIndex: number;

  @prop({ required: true })
  answerDescription!: string;

  @prop({ required: true, default: 10 })
  points?: number;

  @prop({ required: true, default: 1, min: 1, max: 3 })
  level?: number;

  @prop({ required: false, default: 'English' })
  language?: string;
}
