import {
  IsArray,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Order, OrderStatus } from './schema';
import { IDocs } from '../../utilities/templates/types';
import { Ref } from '@typegoose/typegoose';
import { Cart } from '../cart/schema';
import { Menu } from '../menu/schema';
import { File } from '../file/schema';

const doc: IDocs = {};

export class CreateOrderDto
  implements Omit<Required<Order>, 'createdBy' | 'status'>
{
  @IsMongoId()
  fileId: Ref<File>;

  @IsArray()
  items: { item: Ref<Menu>; quantity: number; cartId: Ref<Cart> }[];

  @IsNumber()
  totalPrice: number;

  @IsString()
  address: string;
}

doc['/'] = {
  POST: {
    schema: CreateOrderDto.name,
  },
};

export class UpdateOrderDto
  implements Omit<CreateOrderDto, 'totalPrice' | 'status' | 'fileId'>
{
  @IsOptional()
  items: {
    item: Ref<Menu>;
    quantity: number;
    price: number;
    cartId: Ref<Cart>;
  }[];

  @IsOptional()
  address: string;
}

doc['/:id'] = {
  PUT: {
    schema: UpdateOrderDto.name,
  },
};

export const docs = doc;
