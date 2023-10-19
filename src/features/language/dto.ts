import { IsIn, IsOptional, IsString } from 'class-validator';
import { Language } from './schema';
import { IDocs } from '../../utilities/templates/types';
import { LanguageName } from '../category/dto';

const doc: IDocs = {};

export class CreateLanguageDto implements Omit<Language, 'createdBy'> {
  @IsString()
  @IsIn(LanguageName, {
    message: 'Please provide a valid language name',
  })
  name: string;
}

doc['/'] = {
  POST: {
    schema: CreateLanguageDto.name,
  },
};

export class UpdateLanguageDto extends CreateLanguageDto {}

doc['/'] = {
  PUT: {
    schema: UpdateLanguageDto.name,
  },
};
