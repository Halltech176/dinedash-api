import { IsIn, IsMongoId, IsOptional, IsString } from 'class-validator';
import { FunAndLearn, FunAndLearnStatus } from './schema';
import { IDocs } from '../../utilities/templates/types';
import { Ref } from '@typegoose/typegoose';
import { Category } from '../category/schema';
import { LanguageName } from '../category/dto';

const doc: IDocs = {};

export class CreateFunAndLearnDto implements Omit<FunAndLearn, 'createdBy'> {
  @IsMongoId()
  category: Ref<Category>;

  @IsMongoId()
  subCategory: Ref<Category>;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsIn(LanguageName, {
    message: 'Please provide a valid language name',
  })
  language?: string;

  @IsOptional()
  @IsString()
  status?: FunAndLearnStatus | undefined;
}

doc['/'] = {
  POST: {
    schema: CreateFunAndLearnDto.name,
  },
};

export class UpdateFunAndLearnDto extends CreateFunAndLearnDto {}

doc['/'] = {
  PUT: {
    schema: UpdateFunAndLearnDto.name,
  },
};
