import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';

export enum QuestionType {
  FUNANDLEARN = 'funAndLearn',
  QUIZZONE = 'quizZone',
}

@plugin(mongooseIdValidator)
@pre<QuizSettings>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class QuizSettings {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: true, enum: QuestionType, unique: true })
  name: string;

  @prop({ required: true })
  questionPerQuiz: number;

  @prop({ required: true })
  passPercentage: number;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
