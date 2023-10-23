import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../models/userModel';
import { Category } from '../features/category/schema';
import { File } from '../features/file/schema';
import {
  IsArray,
  IsIn,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { LanguageName } from '../features/category/dto';
import { Language } from '../features/language/schema';

@plugin(mongooseIdValidator)
@pre<QuizSchema>('save', function (next) {
  if (this.correctOptionIndex > this.options.length + 1) {
    return next(new Error('Correct option should be less than options length'));
  }

  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class QuizSchema {
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

  @prop({
    required: false,
    ref: () => Language,
    default: '6530fa895473d72f82118fd1',
  })
  language?: Ref<Language>;

  @prop({ required: false, ref: () => File })
  image?: Ref<File>;
}

export class QuizDto {
  @IsString()
  question: string;

  @IsArray()
  options: Array<number | string>;

  @IsOptional()
  @IsNumber()
  points?: number;

  @IsString()
  answerDescription: string;

  @IsNumber()
  correctOptionIndex: number;

  @IsMongoId()
  category: Ref<Category>;

  @IsMongoId()
  subCategory: Ref<Category>;

  @IsOptional()
  @IsNumber()
  level?: number | undefined;

  @IsOptional()
  @IsMongoId()
  language?: Ref<Language>;

  @IsOptional()
  @IsMongoId()
  image?: Ref<File> | undefined;
}

export class AnsweredQuestionSchema {
  @prop({ required: true })
  option!: number;

  @prop({ required: false })
  correct: boolean;

  @prop({ required: false })
  points: number;
}
