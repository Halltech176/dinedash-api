import { IsArray, IsOptional } from 'class-validator';
import { AnsweredQuestion, ContestSubmissions } from './schema';
import { IDocs } from '../../utilities/templates/types';

const doc: IDocs = {};

export class CreateContestSubmissionsDto
  implements Omit<ContestSubmissions, 'createdBy'>
{
  @IsArray()
  questions!: AnsweredQuestion[];
}

doc['/'] = {
  POST: {
    schema: CreateContestSubmissionsDto.name,
  },
};

export class UpdateContestSubmissionsDto extends CreateContestSubmissionsDto {}

doc['/'] = {
  PUT: {
    schema: UpdateContestSubmissionsDto.name,
  },
};
