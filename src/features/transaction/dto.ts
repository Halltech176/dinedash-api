import { IsMongoId, IsOptional } from 'class-validator';
import { Transaction } from './schema';
import { IDocs } from '../../utilities/templates/types';
import { Ref } from '@typegoose/typegoose';
import { Order } from '../order/schema';

const doc: IDocs = {};

export class CreateTransactionDto
  implements
    Omit<
      Required<Transaction>,
      | 'createdBy'
      | 'status'
      | 'reference'
      | 'amount'
      | 'paymentMethod'
      | 'description'
      | 'file'
    >
{
  @IsMongoId()
  orderId: Ref<Order>;
}

doc['/'] = {
  POST: {
    schema: CreateTransactionDto.name,
  },
};

export class UpdateTransactionDto
  implements
    Omit<
      CreateTransactionDto,
      | 'createdBy'
      | 'status'
      | 'reference'
      | 'amount'
      | 'paymentMethod'
      | 'description'
      | 'orderId'
      | 'file'
    > {}

doc['/:id'] = {
  PUT: {
    schema: UpdateTransactionDto.name,
  },
};

export const docs = doc;
