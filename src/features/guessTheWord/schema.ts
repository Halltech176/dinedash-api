import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { Category } from '../category/schema';
import { File } from '../file/schema';
import { QuizSchema } from '../../utilities/schema';
import { Language } from '../language/schema';

@plugin(mongooseIdValidator)
@pre<QuessTheWord>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class QuessTheWord {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: true, ref: () => Category })
  category: Ref<Category>;

  @prop({ required: true, ref: () => Category })
  subCategory: Ref<Category>;

  @prop({ required: true })
  question!: string;

  @prop({ required: true })
  answer!: string;

  @prop({ required: true })
  answerDescription!: string;

  @prop({ required: true, default: 10 })
  points?: number;

  @prop({ required: true, default: 1, min: 1, max: 3 })
  level?: number;

  @prop({
    required: false,
    ref: () => Language,
    default: '6530fa895473d72f82118fd1',
  })
  language?: Ref<Language>;

  @prop({ required: false, ref: () => File })
  image?: Ref<File>;
}
