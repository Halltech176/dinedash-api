import { IsArray, IsOptional } from 'class-validator';
import { AnsweredQuestion, QuessTheWordSubmission } from './schema';
import { IDocs } from '../../utilities/templates/types';

const doc: IDocs = {};

export class CreateQuessTheWordSubmissionDto
  implements Omit<QuessTheWordSubmission, 'createdBy'>
{
  @IsArray()
  questions!: AnsweredQuestion[];
}

doc['/'] = {
  POST: {
    schema: CreateQuessTheWordSubmissionDto.name,
  },
};

export class UpdateQuessTheWordSubmissionDto extends CreateQuessTheWordSubmissionDto {}

doc['/'] = {
  PUT: {
    schema: UpdateQuessTheWordSubmissionDto.name,
  },
};
