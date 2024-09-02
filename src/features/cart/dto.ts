import { IsArray, IsMongoId, IsNumber, IsOptional } from 'class-validator';
import { Cart } from './schema';
import { IDocs } from '../../utilities/templates/types';
import { Ref } from '@typegoose/typegoose';
import { Menu } from '../menu/schema';

const doc: IDocs = {};

export class CreateCartDto implements Omit<Required<Cart>, 'createdBy'> {
  @IsMongoId()
  public menuId: Ref<Menu>;

  @IsNumber()
  quantity: number;
}

doc['/'] = {
  POST: {
    schema: CreateCartDto.name,
  },
};

export class UpdateCartDto implements Omit<CreateCartDto, ''> {
  @IsOptional()
  @IsMongoId()
  public menuId: Ref<Menu>;

  @IsOptional()
  @IsNumber()
  quantity: number;
}

doc['/:id'] = {
  PUT: {
    schema: UpdateCartDto.name,
  },
};

export const docs = doc;
