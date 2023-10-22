import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { Types } from 'mongoose';
import { Question } from '../question/schema';
import { AnsweredQuestionSchema } from '../../utilities/schema';

export class AnsweredQuestion extends AnsweredQuestionSchema {
  @prop({
    required: true,
    ref: () => Question,
  })
  questionID!: Types.ObjectId;
}

@plugin(mongooseIdValidator)
@pre<FunAndLearnSubmission>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class FunAndLearnSubmission {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ type: () => [AnsweredQuestion], required: true })
  questions!: AnsweredQuestion[];

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
