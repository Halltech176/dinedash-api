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
import { Language } from '../language/schema';

const doc: IDocs = {};

export class CreateQuessTheWordDto implements Omit<QuessTheWord, 'createdBy'> {
  @IsString()
  question: string;

  @IsString()
  answer: string;

  @IsOptional()
  @IsNumber()
  points?: number;

  @IsString()
  answerDescription: string;

  @IsMongoId()
  category: Ref<Category>;

  @IsMongoId()
  subCategory: Ref<Category>;

  @IsOptional()
  @IsNumber()
  level?: number | undefined;

  @IsOptional()
  @IsMongoId()
  language?: Ref<Language>;

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
