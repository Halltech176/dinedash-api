import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { Category } from './schema';
import { IDocs } from '../../utilities/templates/types';
import { Ref } from '@typegoose/typegoose';
import { File } from '../file/schema';

const doc: IDocs = {};

export class CreateCategoryDto
  implements Omit<Required<Category>, 'createdBy'>
{
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  parentCategory: Ref<Category>;

  @IsMongoId()
  image: Ref<File>;
}

doc['/'] = {
  POST: {
    schema: CreateCategoryDto.name,
  },
};

export class UpdateCategoryDto implements Omit<CreateCategoryDto, ''> {
  @IsOptional()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  parentCategory: Ref<Category>;

  @IsOptional()
  image: Ref<File>;
}

doc['/:id'] = {
  PUT: {
    schema: UpdateCategoryDto.name,
  },
};

export const docs = doc;
