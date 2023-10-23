import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { File } from '../file/schema';
import { Category } from '../category/schema';
import { Language } from '../language/schema';
import { QuizSchema } from '../../utilities/schema';

@plugin(mongooseIdValidator)
@pre<AudioQuiz>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class AudioQuiz extends QuizSchema {
  @prop({ required: false, ref: () => File })
  audioFile?: Ref<File>;

  @prop({ required: false })
  audioUrl?: string;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
