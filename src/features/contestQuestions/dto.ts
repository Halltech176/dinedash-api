import {
  IsArray,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ContestQuestions } from './schema';
import { IDocs } from '../../utilities/templates/types';
import { Ref } from '@typegoose/typegoose';
import { Contest } from '../contest/schema';

const doc: IDocs = {};

export class CreateContestQuestionsDto
  implements Omit<ContestQuestions, 'createdBy'>
{
  @IsString()
  question: string;

  @IsMongoId()
  typeId: Ref<Contest>;

  @IsArray()
  options: Array<number | string>;

  @IsOptional()
  @IsNumber()
  points?: number;

  @IsOptional()
  @IsNumber()
  level?: number;

  @IsString()
  answerDescription: string;

  @IsNumber()
  correctOptionIndex: number;
}

doc['/'] = {
  POST: {
    schema: CreateContestQuestionsDto.name,
  },
};

export class UpdateContestQuestionsDto extends CreateContestQuestionsDto {}

doc['/'] = {
  PUT: {
    schema: UpdateContestQuestionsDto.name,
  },
};
