import {
  IsArray,
  IsBoolean,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Validate,
  ValidateNested,
  ValidationArguments,
  isNotEmpty,
} from 'class-validator';
import { Question, QuestionDifficulty, QuestionType } from './schema';
import { IDocs } from '../../utilities/templates/types';
import { Type } from 'class-transformer';
import { Category } from '../category/schema';

import { Ref } from '@typegoose/typegoose';
import { LanguageName } from '../category/dto';
const doc: IDocs = {};

export class CreateQuestionDto implements Omit<Question, 'createdBy'> {
  @IsString()
  question: string;

  @IsArray()
  options: Array<number | string>;

  @IsOptional()
  @IsNumber()
  points?: number;

  @IsOptional()
  @IsNumber()
  level?: number;

  @IsString()
  answerDescription: string;

  @IsNumber()
  correctOptionIndex: number;

  @IsString()
  type: QuestionType;

  @IsOptional()
  @IsMongoId()
  category: Ref<Category>;

  @IsOptional()
  difficulty: QuestionDifficulty;

  @IsOptional()
  @IsMongoId()
  subCategory: Ref<Category>;

  @IsOptional()
  @IsIn(LanguageName, {
    message: 'Please provide a valid language name',
  })
  language?: string;
}

doc['/'] = {
  POST: {
    schema: CreateQuestionDto.name,
  },
};

export class UpdateQuestionDto extends CreateQuestionDto {}

doc['/'] = {
  PUT: {
    schema: UpdateQuestionDto.name,
  },
};
