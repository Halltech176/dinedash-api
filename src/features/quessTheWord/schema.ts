import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { Category } from '../category/schema';
import { File } from '../file/schema';
import { QuizSchema } from '../../utilities/schema';

@plugin(mongooseIdValidator)
@pre<QuessTheWord>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class QuessTheWord extends QuizSchema {}
