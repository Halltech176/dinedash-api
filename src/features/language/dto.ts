import { IsOptional } from 'class-validator';
import { Language } from './schema';
import { IDocs } from '../../utilities/templates/types';

const doc: IDocs = {};

export class CreateLanguageDto implements Omit<Language, 'createdBy'> {}

doc['/'] = {
  POST: {
    schema: CreateLanguageDto.name,
  },
};

export class UpdateLanguageDto implements Omit<CreateLanguageDto, ''> {}

doc['/'] = {
  PUT: {
    schema: UpdateLanguageDto.name,
  },
};
