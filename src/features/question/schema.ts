import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { FunAndLearn } from '../funAndLearn/schema';
import { QuizSchema } from '../../utilities/schema';

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
export class Question extends QuizSchema {}
{
  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
