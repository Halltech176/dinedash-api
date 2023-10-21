import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { Category } from '../category/schema';
import { File } from '../file/schema';
import { QuizSchema } from '../../utilities/schema';

@plugin(mongooseIdValidator)
@pre<DailyQuiz>('save', function (next) {
  if (this.correctOptionIndex > this.options.length + 1) {
    return next(new Error('Correct option should be less than options length'));
  }

  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class DailyQuiz extends QuizSchema {}
