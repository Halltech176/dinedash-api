import { plugin, pre, modelOptions, prop, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { FunAndLearn } from '../funAndLearn/schema';
import { QuizSchema } from '../../utilities/schema';

@plugin(mongooseIdValidator)
@pre<FunAndLearnQuestion>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class FunAndLearnQuestion extends QuizSchema {
  @prop({ required: true, immutable: true, ref: () => FunAndLearn })
  typeID: Ref<FunAndLearn>;
  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
