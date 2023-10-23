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
import { File } from '../file/schema';
import { Language } from '../language/schema';
import { QuizDto } from '../../utilities/schema';

const doc: IDocs = {};

export class CreateAudioQuizDto extends QuizDto {
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
