import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { Cart } from '../cart/schema';

// create eneum for Order status

export enum OrderStatus {
  PENDING = 'Pending',
  PROCESSING = 'Processing',
  COMPLETED = 'Completed',
  DELIVERED = 'Delivered',
  RETURNED = 'Returned',
  EXPIRED = 'Expired',
  REFUNDED = 'Refunded',
  CANCELLED = 'Cancelled',
}

@plugin(mongooseIdValidator)
@pre<Order>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class Order {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: true })
  items!: Array<{
    item: Ref<Cart>;
    quantity: number;
    price: number;
  }>;

  @prop({ required: true })
  totalPrice!: number;

  @prop({ required: true, default: OrderStatus.PENDING, enum: OrderStatus })
  status!: OrderStatus;

  @prop({ required: true })
  address!: string;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
