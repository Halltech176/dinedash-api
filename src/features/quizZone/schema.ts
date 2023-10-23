import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { Category } from '../category/schema';
import errorHandler from '../../middlewares/errorHandler';
import mongoose from 'mongoose';
import { File } from '../file/schema';
import { QuizSchema } from '../../utilities/schema';

@plugin(mongooseIdValidator)
@pre<QuizZone>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;

  if (this.correctOptionIndex > this.options.length + 1) {
    return next(new Error('Correct option should be less than options length'));
  }

  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class QuizZone extends QuizSchema {}
