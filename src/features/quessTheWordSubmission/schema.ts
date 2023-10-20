import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { QuessTheWord } from '../quessTheWord/schema';
import { Types } from 'mongoose';

export class AnsweredQuestion {
  @prop({
    required: true,
    ref: () => QuessTheWord,
  })
  questionID!: Types.ObjectId;

  @prop({ required: true })
  answer!: string | number;

  @prop({ required: false })
  correct: boolean;

  @prop({ required: false })
  points: number;
}

@plugin(mongooseIdValidator)
@pre<QuessTheWordSubmission>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class QuessTheWordSubmission {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ type: () => [AnsweredQuestion], required: true })
  questions!: AnsweredQuestion[];
  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
