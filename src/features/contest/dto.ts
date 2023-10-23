import {
  IsArray,
  IsDate,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Contest } from './schema';
import { IDocs } from '../../utilities/templates/types';
import { Ref } from '@typegoose/typegoose';
import { File } from '../file/schema';

const doc: IDocs = {};

export class CreateContestDto implements Omit<Contest, 'createdBy'> {
  @IsString()
  name: string;

  @IsOptional()
  @IsMongoId()
  image: Ref<File>;

  @IsString()
  startDate: Date;

  @IsString()
  endDate: Date;

  @IsNumber()
  entryFee: number;

  @IsNumber()
  topUsers: number;

  @IsString()
  description: string;

  @IsArray()
  winnersPrize: number[];
}

doc['/'] = {
  POST: {
    schema: CreateContestDto.name,
  },
};

export class UpdateContestDto extends CreateContestDto {}

doc['/'] = {
  PUT: {
    schema: UpdateContestDto.name,
  },
};
