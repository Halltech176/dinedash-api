import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { Review } from './schema';
import { IDocs } from '../../utilities/templates/types';
import { Ref } from '@typegoose/typegoose';
import { Menu } from '../menu/schema';

const doc: IDocs = {};

export class CreateReviewDto implements Omit<Required<Review>, 'createdBy'> {
  @IsString()
  comment: string;

  @IsNumber()
  rating: number;

  @IsMongoId()
  menuId: Ref<Menu>;
}

doc['/'] = {
  POST: {
    schema: CreateReviewDto.name,
  },
};

export class UpdateReviewDto implements Omit<CreateReviewDto, ''> {
  @IsOptional()
  comment: string;

  @IsOptional()
  @IsNumber()
  rating: number;

  @IsOptional()
  @IsMongoId()
  menuId: Ref<Menu>;
}

doc['/:id'] = {
  PUT: {
    schema: UpdateReviewDto.name,
  },
};

export const docs = doc;
