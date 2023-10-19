import { IsArray, IsOptional } from 'class-validator';
import { AnsweredQuestion, QuizZoneSubmission } from './schema';
import { IDocs } from '../../utilities/templates/types';

const doc: IDocs = {};

export class CreateQuizZoneSubmissionDto
  implements Omit<QuizZoneSubmission, 'createdBy'>
{
  @IsArray()
  questions!: AnsweredQuestion[];
}

doc['/'] = {
  POST: {
    schema: CreateQuizZoneSubmissionDto.name,
  },
};

export class UpdateQuizZoneSubmissionDto {}

doc['/'] = {
  PUT: {
    schema: UpdateQuizZoneSubmissionDto.name,
  },
};
