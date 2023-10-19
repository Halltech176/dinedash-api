import { IsOptional } from 'class-validator';
import { ContestSubmissions } from './schema';
import { IDocs} from '../../utilities/templates/types';


const doc: IDocs = {};


export class CreateContestSubmissionsDto implements Omit<ContestSubmissions, 'createdBy'> {
}

doc["/"] = {
  POST: {
    schema: CreateContestSubmissionsDto.name,
  },
};

export class UpdateContestSubmissionsDto implements Omit<CreateContestSubmissionsDto, ''> {

}

doc["/"] = {
  PUT: {
    schema: UpdateContestSubmissionsDto.name,
  },
};
