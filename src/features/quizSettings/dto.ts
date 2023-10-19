import { IsNumber, IsOptional, IsString } from 'class-validator';
import { QuestionType, QuizSettings } from './schema';
import { IDocs } from '../../utilities/templates/types';

const doc: IDocs = {};

export class CreateQuizSettingsDto implements Omit<QuizSettings, 'createdBy'> {
  @IsString()
  name: QuestionType;

  @IsNumber()
  questionPerQuiz: number;

  @IsNumber()
  passPercentage: number;
}

doc['/'] = {
  POST: {
    schema: CreateQuizSettingsDto.name,
  },
};

export class UpdateQuizSettingsDto extends CreateQuizSettingsDto {}

doc['/'] = {
  PUT: {
    schema: UpdateQuizSettingsDto.name,
  },
};
