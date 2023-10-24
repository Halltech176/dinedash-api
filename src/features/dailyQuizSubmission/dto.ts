import { IsArray, IsOptional } from 'class-validator';
import { AnsweredQuestion, DailyQuizSubmission } from './schema';
import { IDocs } from '../../utilities/templates/types';

const doc: IDocs = {};

export class CreateDailyQuizSubmissionDto
  implements Omit<DailyQuizSubmission, 'createdBy' | 'points'>
{
  @IsArray()
  questions!: AnsweredQuestion[];
}

doc['/'] = {
  POST: {
    schema: CreateDailyQuizSubmissionDto.name,
  },
};

export class UpdateDailyQuizSubmissionDto extends CreateDailyQuizSubmissionDto {}

doc['/'] = {
  PUT: {
    schema: UpdateDailyQuizSubmissionDto.name,
  },
};
