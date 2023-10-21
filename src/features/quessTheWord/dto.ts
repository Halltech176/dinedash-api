import {
  IsArray,
  IsIn,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { QuessTheWord } from './schema';
import { IDocs } from '../../utilities/templates/types';
import { Category } from '../category/schema';
import { Ref } from '@typegoose/typegoose';
import { LanguageName } from '../category/dto';
import { File } from '../file/schema';
import { QuizDto } from '../../utilities/schema';

const doc: IDocs = {};

export class CreateQuessTheWordDto extends QuizDto {}

doc['/'] = {
  POST: {
    schema: CreateQuessTheWordDto.name,
  },
};

export class UpdateQuessTheWordDto extends CreateQuessTheWordDto {}

doc['/'] = {
  PUT: {
    schema: UpdateQuessTheWordDto.name,
  },
};
