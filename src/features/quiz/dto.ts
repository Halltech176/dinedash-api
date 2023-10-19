import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AnsweredQuestion, QuestionType, Quiz } from './schema';
import { IDocs } from '../../utilities/templates/types';
import { Types } from 'mongoose';
import { Type } from 'class-transformer';

const doc: IDocs = {};

export class CreateQuizDto
  implements Omit<Quiz, 'createdBy' | 'correct' | 'points'>
{
  @IsArray()
  questions!: AnsweredQuestion[];

  @IsString()
  type: QuestionType;
}

doc['/'] = {
  POST: {
    schema: CreateQuizDto.name,
  },
};

export class UpdateQuizDto extends CreateQuizDto {}

doc['/'] = {
  PUT: {
    schema: UpdateQuizDto.name,
  },
};
