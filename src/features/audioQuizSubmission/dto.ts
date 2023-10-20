import { IsArray, IsOptional } from 'class-validator';
import { AnsweredQuestion, AudioQuizSubmission } from './schema';
import { IDocs } from '../../utilities/templates/types';

const doc: IDocs = {};

export class CreateAudioQuizSubmissionDto
  implements Omit<AudioQuizSubmission, 'createdBy'>
{
  @IsArray()
  questions!: AnsweredQuestion[];
}

doc['/'] = {
  POST: {
    schema: CreateAudioQuizSubmissionDto.name,
  },
};

export class UpdateAudioQuizSubmissionDto extends CreateAudioQuizSubmissionDto {}

doc['/'] = {
  PUT: {
    schema: UpdateAudioQuizSubmissionDto.name,
  },
};
