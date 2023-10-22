import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { ContestQuestions } from '../contestQuestions/schema';
import { Types } from 'mongoose';
import { AnsweredQuestionSchema } from '../../utilities/schema';

export class AnsweredQuestion extends AnsweredQuestionSchema {
  @prop({
    required: true,
    ref: () => ContestQuestions,
  })
  questionID!: Types.ObjectId;
}

@plugin(mongooseIdValidator)
@pre<ContestSubmissions>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class ContestSubmissions {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ type: () => [AnsweredQuestion], required: true })
  questions!: AnsweredQuestion[];

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
