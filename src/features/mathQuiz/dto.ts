import {
  IsArray,
  IsIn,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { MathQuiz } from './schema';
import { IDocs } from '../../utilities/templates/types';
import { LanguageName } from '../category/dto';
import { Ref } from '@typegoose/typegoose';
import { Category } from '../category/schema';
import { File } from '../file/schema';

const doc: IDocs = {};

export class CreateMathQuizDto implements Omit<MathQuiz, 'createdBy'> {
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
  @IsIn(LanguageName, {
    message: 'Please provide a valid language name',
  })
  language?: string;

  @IsOptional()
  @IsMongoId()
  image?: Ref<File> | undefined;
}

doc['/'] = {
  POST: {
    schema: CreateMathQuizDto.name,
  },
};

export class UpdateMathQuizDto extends CreateMathQuizDto {}

doc['/'] = {
  PUT: {
    schema: UpdateMathQuizDto.name,
  },
};
