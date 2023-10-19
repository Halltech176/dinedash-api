import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { FunAndLearn } from '../funAndLearn/schema';

export enum QuestionType {
  FUNANDLEARN = 'funAndLearn',
}

@plugin(mongooseIdValidator)
@pre<Question>('save', function (next) {
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

  @prop({ required: true, ref: () => FunAndLearn })
  typeId: Ref<FunAndLearn>;

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

  @prop({ required: true })
  answerDescription!: string;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
