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
  isMongoId,
  isNotEmpty,
} from 'class-validator';
import { QuizZone } from './schema';
import { IDocs } from '../../utilities/templates/types';
import { Type } from 'class-transformer';
import { Category } from '../category/schema';

import { Ref, isModel } from '@typegoose/typegoose';
import { LanguageName } from '../category/dto';
import { File } from '../file/schema';
import { QuizDto } from '../../utilities/schema';

const doc: IDocs = {};

export class CreateQuizZoneDto extends QuizDto {}

doc['/'] = {
  POST: {
    schema: CreateQuizZoneDto.name,
  },
};

export class UpdateQuizZoneDto extends CreateQuizZoneDto {}

doc['/'] = {
  PUT: {
    schema: UpdateQuizZoneDto.name,
  },
};
