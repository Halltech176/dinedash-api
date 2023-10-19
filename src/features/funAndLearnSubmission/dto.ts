import { IsArray, IsOptional } from 'class-validator';
import { AnsweredQuestion, FunAndLearnSubmission } from './schema';
import { IDocs } from '../../utilities/templates/types';

const doc: IDocs = {};

export class CreateFunAndLearnSubmissionDto
  implements Omit<FunAndLearnSubmission, 'createdBy'>
{
  @IsArray()
  questions!: AnsweredQuestion[];
}

doc['/'] = {
  POST: {
    schema: CreateFunAndLearnSubmissionDto.name,
  },
};

export class UpdateFunAndLearnSubmissionDto {}

doc['/'] = {
  PUT: {
    schema: UpdateFunAndLearnSubmissionDto.name,
  },
};
