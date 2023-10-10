import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { Types } from 'mongoose';
import { Question } from '../question/schema';

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

  @prop({ required: true, ref: () => Question })
  questionId!: Ref<Question>;

  @prop({ required: false, default: false })
  correct?: boolean;

  @prop({ required: true })
  option!: string | number;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
