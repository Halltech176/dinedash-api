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
import { Question, QuestionType } from './schema';
import { IDocs } from '../../utilities/templates/types';
import { Ref } from '@typegoose/typegoose';
import { LanguageName } from '../category/dto';
import { FunAndLearn } from '../funAndLearn/schema';
const doc: IDocs = {};

export class CreateQuestionDto implements Omit<Question, 'createdBy'> {
  @IsString()
  question: string;

  @IsMongoId()
  typeId: Ref<FunAndLearn>;

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
