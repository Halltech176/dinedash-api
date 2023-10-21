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
import { QuizDto } from '../../utilities/schema';

const doc: IDocs = {};

export class CreateContestQuestionsDto extends QuizDto {}

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
