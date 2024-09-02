import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Order, OrderStatus } from './schema';
import { IDocs } from '../../utilities/templates/types';
import { Ref } from '@typegoose/typegoose';
import { Cart } from '../cart/schema';

const doc: IDocs = {};

export class CreateOrderDto implements Omit<Required<Order>, 'createdBy'> {
  @IsArray()
  items: { item: Ref<Cart>; quantity: number; price: number }[];

  @IsNumber()
  totalPrice: number;

  @IsString()
  status: OrderStatus;

  @IsString()
  address: string;
}

doc['/'] = {
  POST: {
    schema: CreateOrderDto.name,
  },
};

export class UpdateOrderDto
  implements Omit<CreateOrderDto, 'totalPrice' | 'status'>
{
  @IsOptional()
  items: { item: Ref<Cart>; quantity: number; price: number }[];

  @IsOptional()
  address: string;
}

doc['/:id'] = {
  PUT: {
    schema: UpdateOrderDto.name,
  },
};

export const docs = doc;
