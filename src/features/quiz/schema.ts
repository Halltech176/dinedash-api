import {
  prop,
  plugin,
  pre,
  modelOptions,
  Ref,
  DocumentType,
} from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { Types } from 'mongoose';
import { Question } from '../question/schema';
import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { QuizZone } from '../quizZone/schema';

export enum QuestionType {
  QUIZZONE = 'quizZone',
  FUNANDLEARN = 'funAndLearn',
}

export class AnsweredQuestion {
  @prop({
    required: true,
    ref: () => QuizZone,
  })
  questionID!: Types.ObjectId;

  @prop({ required: true })
  option!: number;

  @prop({ required: false })
  correct: boolean;

  @prop({ required: false })
  points: number;
}

@plugin(mongooseIdValidator)
@pre<Quiz>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class Quiz {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ type: () => [AnsweredQuestion], required: true })
  questions!: AnsweredQuestion[];

  @prop({ required: true, enum: QuestionType })
  type!: QuestionType;
}
