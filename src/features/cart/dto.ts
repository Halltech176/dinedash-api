import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { Cart } from './schema';
import { IDocs } from '../../utilities/templates/types';
import { Ref } from '@typegoose/typegoose';
import { Menu } from '../menu/schema';

const doc: IDocs = {};

export class CreateCartDto implements Omit<Required<Cart>, 'createdBy'> {
  @IsArray()
  items: { menuId: Ref<Menu>; quantity: number }[];
}

doc['/'] = {
  POST: {
    schema: CreateCartDto.name,
  },
};

export class UpdateCartDto implements Omit<CreateCartDto, ''> {
  @IsOptional()
  items: { menuId: Ref<Menu>; quantity: number }[];
}

doc['/:id'] = {
  PUT: {
    schema: UpdateCartDto.name,
  },
};

export const docs = doc;
