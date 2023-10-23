import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { DailyQuiz } from '../dailyQuiz/schema';
import { Types } from 'mongoose';
import { AnsweredQuestionSchema } from '../../utilities/schema';

export class AnsweredQuestion extends AnsweredQuestionSchema {
  @prop({
    required: true,
    ref: () => DailyQuiz,
  })
  questionID!: Types.ObjectId;
}

@plugin(mongooseIdValidator)
@pre<DailyQuizSubmission>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class DailyQuizSubmission {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ type: () => [AnsweredQuestion], required: true })
  questions!: AnsweredQuestion[];

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
