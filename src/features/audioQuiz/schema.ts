import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { File } from '../file/schema';
import { Category } from '../category/schema';

@plugin(mongooseIdValidator)
@pre<AudioQuiz>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class AudioQuiz {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: true, ref: () => Category })
  category: Ref<Category>;

  @prop({ required: true, ref: () => Category })
  subCategory: Ref<Category>;

  @prop({ required: true })
  question!: string;

  @prop({ required: true, default: [] })
  options!: Array<number | string>;

  @prop({
    required: true,
    min: 1,
  })
  correctOptionIndex: number;

  @prop({ required: true })
  answerDescription!: string;

  @prop({ required: true, default: 10 })
  points?: number;

  @prop({ required: true, default: 1, min: 1, max: 3 })
  level?: number;

  @prop({ required: false, default: 'English' })
  language?: string;

  @prop({ required: false, ref: () => File })
  audioFile?: Ref<File>;

  @prop({ required: false })
  audioUrl?: string;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
