import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { Contest } from '../contest/schema';
import { QuizSchema } from '../../utilities/schema';

@plugin(mongooseIdValidator)
@pre<ContestQuestions>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class ContestQuestions extends QuizSchema {
  @prop({ required: true, ref: () => Contest })
  typeID: Ref<Contest>;
}
