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

const doc: IDocs = {};

export class CreateQuessTheWordDto implements Omit<QuessTheWord, 'createdBy'> {
  @IsString()
  question: string;

  @IsArray()
  options: Array<number | string>;

  @IsOptional()
  @IsNumber()
  points?: number;

  @IsOptional()
  @IsString()
  answerDescription: string;

  @IsString()
  answer: string;

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
    schema: CreateQuessTheWordDto.name,
  },
};

export class UpdateQuessTheWordDto extends CreateQuessTheWordDto {}

doc['/'] = {
  PUT: {
    schema: UpdateQuessTheWordDto.name,
  },
};
