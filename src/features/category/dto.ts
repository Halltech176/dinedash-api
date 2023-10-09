import { IsIn, IsMongoId, IsOptional, IsString } from 'class-validator';
import { Category } from './schema';
import { File } from '../file/schema';
import { IDocs } from '../../utilities/templates/types';
import { Types } from 'mongoose';
import { Ref } from '@typegoose/typegoose';

import LanguageData from '../../data/language.json';

export const LanguageName: string[] = LanguageData.map((item) => item.name);

console.log(LanguageName);

const doc: IDocs = {};

export class CreateCategoryDto implements Omit<Category, 'createdBy'> {
  @IsString()
  name!: string;

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

export class UpdateCategoryDto extends CreateCategoryDto {}

doc['/'] = {
  PUT: {
    schema: UpdateCategoryDto.name,
  },
};
