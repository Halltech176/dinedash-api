import { IsBoolean, IsMongoId, IsOptional, IsString } from 'class-validator';
import { Quiz } from './schema';
import { IDocs } from '../../utilities/templates/types';
import { Types } from 'mongoose';

const doc: IDocs = {};

export class CreateQuizDto implements Omit<Quiz, 'createdBy'> {
  @IsOptional()
  @IsBoolean()
  correct?: boolean;

  @IsOptional()
  option!: string | number;

  @IsMongoId()
  questionId!: Types.ObjectId;
}

doc['/'] = {
  POST: {
    schema: CreateQuizDto.name,
  },
};

export class UpdateQuizDto extends CreateQuizDto {}

doc['/'] = {
  PUT: {
    schema: UpdateQuizDto.name,
  },
};
