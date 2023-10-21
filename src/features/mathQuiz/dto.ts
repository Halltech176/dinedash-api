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
import { QuizDto } from '../../utilities/schema';

const doc: IDocs = {};

export class CreateMathQuizDto extends QuizDto {}

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
