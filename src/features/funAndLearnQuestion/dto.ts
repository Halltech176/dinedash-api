import { FunAndLearnQuestion } from './schema';
import { IDocs } from '../../utilities/templates/types';
import { Ref } from '@typegoose/typegoose';
import { LanguageName } from '../category/dto';
import { FunAndLearn } from '../funAndLearn/schema';
import { QuizDto } from '../../utilities/schema';
import { IsMongoId } from 'class-validator';
const doc: IDocs = {};

export class CreateFunAndLearnQuestionDto extends QuizDto {
  @IsMongoId()
  typeID: Ref<FunAndLearn>;
}

doc['/'] = {
  POST: {
    schema: CreateFunAndLearnQuestionDto.name,
  },
};

export class UpdateFunAndLearnQuestionDto extends CreateFunAndLearnQuestionDto {}

doc['/'] = {
  PUT: {
    schema: UpdateFunAndLearnQuestionDto.name,
  },
};
