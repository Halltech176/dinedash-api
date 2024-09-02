import {
  IsArray,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Menu } from './schema';
import { IDocs } from '../../utilities/templates/types';
import { Ref } from '@typegoose/typegoose';
import { Category } from '../category/schema';
import { File } from '../file/schema';

const doc: IDocs = {};

export class CreateMenuDto implements Omit<Required<Menu>, 'createdBy'> {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsMongoId()
  category: Ref<Category>;

  @IsMongoId()
  image: Ref<File>;

  @IsArray()
  ingredients: string[];

  @IsOptional()
  @IsArray()
  tags: string[];
}

doc['/'] = {
  POST: {
    schema: CreateMenuDto.name,
  },
};

export class UpdateMenuDto implements Omit<CreateMenuDto, ''> {
  @IsOptional()
  name: string;
  @IsOptional()
  description: string;

  @IsOptional()
  price: number;

  @IsOptional()
  category: Ref<Category>;

  ingredients: string[];

  @IsOptional()
  tags: string[];

  @IsOptional()
  image: Ref<File>;
}

doc['/:id'] = {
  PUT: {
    schema: UpdateMenuDto.name,
  },
};

export const docs = doc;
