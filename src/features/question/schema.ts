import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { Category } from '../category/schema';

export enum QuestionType {
  QUIZZONE = 'quizZone',
  DUETMODE = 'duetMode',
  FUNANDLEARN = 'funAndLearn',
  DAILYQUIZ = 'dailyQuiz',
  GROUPBATTLE = 'groupBattle',
  CONTEST = 'contest',
}

export enum QuestionDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

const requiredCategories = [QuestionType.QUIZZONE, QuestionType.FUNANDLEARN];

const requiredDifficulties = [QuestionType.DUETMODE];

@plugin(mongooseIdValidator)
@pre<Question>('save', function (next) {
  if (+this.correctOptionIndex > +this.options.length) {
    return next(
      new Error('The correct option index cannot exceed the number of options'),
    );
  }

  if (requiredCategories.includes(this.type) && !this.category) {
    return next(new Error('Category is required'));
  }

  if (requiredCategories.includes(this.type) && !this.subCategory) {
    return next(new Error('Sub Category is required'));
  }

  if (requiredDifficulties.includes(this.type) && !this.difficulty) {
    return next(new Error('difficulty  is required'));
  }

  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class Question {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: true })
  question!: string;

  @prop({ required: true, enum: QuestionType })
  type!: QuestionType;

  @prop({ required: true, default: [] })
  options!: Array<number | string>;

  @prop({
    required: true,
    min: 1,
  })
  correctOptionIndex: number;

  @prop({ required: true, default: 10 })
  points?: number;

  @prop({ required: false, ref: () => Category })
  category?: Ref<Category>;

  @prop({
    required: false,
  })
  difficulty: QuestionDifficulty;

  @prop({ required: false, ref: () => Category })
  subCategory?: Ref<Category>;

  @prop({ required: false, default: 1, min: 1, max: 3 })
  level?: number;

  @prop({ required: true })
  answerDescription!: string;

  @prop({ required: false, default: 'English' })
  language?: string;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
