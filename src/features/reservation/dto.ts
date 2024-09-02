import { IsOptional } from 'class-validator';
import { Reservation } from './schema';
import { IDocs } from '../../utilities/templates/types';

const doc: IDocs = {};

export class CreateReservationDto
  implements Omit<Required<Reservation>, 'createdBy'> {}

doc['/'] = {
  POST: {
    schema: CreateReservationDto.name,
  },
};

export class UpdateReservationDto implements Omit<CreateReservationDto, ''> {}

doc['/:id'] = {
  PUT: {
    schema: UpdateReservationDto.name,
  },
};

export const docs = doc;
