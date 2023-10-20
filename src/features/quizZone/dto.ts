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

const doc: IDocs = {};

export class CreateQuizZoneDto implements Omit<QuizZone, 'createdBy'> {
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
    schema: CreateQuizZoneDto.name,
  },
};

export class UpdateQuizZoneDto extends CreateQuizZoneDto {}

doc['/'] = {
  PUT: {
    schema: UpdateQuizZoneDto.name,
  },
};
