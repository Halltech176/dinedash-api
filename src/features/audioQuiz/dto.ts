import {
  IsArray,
  IsIn,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { AudioQuiz } from './schema';
import { IDocs } from '../../utilities/templates/types';
import { Ref } from '@typegoose/typegoose';
import { Category } from '../category/schema';
import { LanguageName } from '../category/dto';
import { File } from '../file/schema';

const doc: IDocs = {};

export class CreateAudioQuizDto implements Omit<AudioQuiz, 'createdBy'> {
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
  audioUrl?: string;

  @IsOptional()
  @IsMongoId()
  audioFile?: Ref<File>;
}

doc['/'] = {
  POST: {
    schema: CreateAudioQuizDto.name,
  },
};

export class UpdateAudioQuizDto extends CreateAudioQuizDto {}

doc['/'] = {
  PUT: {
    schema: UpdateAudioQuizDto.name,
  },
};
