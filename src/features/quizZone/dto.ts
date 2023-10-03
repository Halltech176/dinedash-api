import { IsOptional } from 'class-validator';
import { QuizZone } from './schema';
import { IDocs} from '../../utilities/templates/types';


const doc: IDocs = {};


export class CreateQuizZoneDto implements Omit<QuizZone, 'createdBy'> {
}

doc["/"] = {
  POST: {
    schema: CreateQuizZoneDto.name,
  },
};

export class UpdateQuizZoneDto implements Omit<CreateQuizZoneDto, ''> {

}

doc["/"] = {
  PUT: {
    schema: UpdateQuizZoneDto.name,
  },
};
