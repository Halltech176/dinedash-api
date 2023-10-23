import { IsArray, IsOptional } from 'class-validator';
import { AnsweredQuestion, MathQuizSubmission } from './schema';
import { IDocs } from '../../utilities/templates/types';

const doc: IDocs = {};

export class CreateMathQuizSubmissionDto
  implements Omit<MathQuizSubmission, 'createdBy'>
{
  @IsArray()
  questions!: AnsweredQuestion[];
}

doc['/'] = {
  POST: {
    schema: CreateMathQuizSubmissionDto.name,
  },
};

export class UpdateMathQuizSubmissionDto extends CreateMathQuizSubmissionDto {}

doc['/'] = {
  PUT: {
    schema: UpdateMathQuizSubmissionDto.name,
  },
};
