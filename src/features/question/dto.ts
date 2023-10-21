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
import { QuizDto } from '../../utilities/schema';
const doc: IDocs = {};

export class CreateQuestionDto extends QuizDto {}

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
