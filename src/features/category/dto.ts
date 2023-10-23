import { IsIn, IsMongoId, IsOptional, IsString } from 'class-validator';
import { Category } from './schema';
import { File } from '../file/schema';
import { IDocs } from '../../utilities/templates/types';
import { Types } from 'mongoose';
import { Ref } from '@typegoose/typegoose';

import LanguageData from '../../data/language.json';
import { CategoryType } from './schema';

export const LanguageName: string[] = LanguageData.map((item) => item.name);

console.log(LanguageName);

const doc: IDocs = {};

export class CreateCategoryDto implements Omit<Category, 'createdBy'> {
  @IsString()
  name!: string;

  @IsString()
  type!: CategoryType;

  @IsOptional()
  @IsMongoId()
  image?: Ref<File>;

  @IsOptional()
  @IsMongoId()
  parentCategory?: Ref<Category>;

  @IsOptional()
  @IsIn(LanguageName, {
    message: `Please enter a valid language.`,
  })
  language!: string;
}

doc['/'] = {
  POST: {
    schema: CreateCategoryDto.name,
  },
};

export class UpdateCategoryDto implements CreateCategoryDto {
  @IsOptional()
  name: string;
  @IsOptional()
  type: CategoryType;
  @IsOptional()
  image?: Ref<File> | undefined;
  @IsOptional()
  parentCategory?: Ref<Category> | undefined;
  @IsOptional()
  language: string;
}

doc['/'] = {
  PUT: {
    schema: UpdateCategoryDto.name,
  },
};
