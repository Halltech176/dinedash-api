import {
  IsArray,
  IsIn,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { DailyQuiz } from './schema';
import { IDocs } from '../../utilities/templates/types';
import { Category } from '../category/schema';
import { Ref } from '@typegoose/typegoose';
import { LanguageName } from '../category/dto';
import { File } from '../file/schema';
import { QuizDto } from '../../utilities/schema';

const doc: IDocs = {};

export class CreateDailyQuizDto extends QuizDto {}

doc['/'] = {
  POST: {
    schema: CreateDailyQuizDto.name,
  },
};

export class UpdateDailyQuizDto extends CreateDailyQuizDto {}

doc['/'] = {
  PUT: {
    schema: UpdateDailyQuizDto.name,
  },
};
