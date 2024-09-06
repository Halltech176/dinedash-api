import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { Order } from '../order/schema';
import { File } from '../file/schema';

// create an enum of payment methods

export enum PaymentMethod {
  Cash = 'cash',
  CreditCard = 'creditCard',
  PayPal = 'paypal',
}

// create an enum of payment status

export enum PaymentStatus {
  Pending = 'pending',
  Processing = 'processing',
  Completed = 'completed',
  Failed = 'failed',
}

@plugin(mongooseIdValidator)
@pre<Transaction>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class Transaction {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: true })
  amount!: number;

  @prop({ required: true })
  description!: string;

  @prop({ required: true, enum: PaymentMethod })
  paymentMethod!: PaymentMethod;

  @prop({ required: true, enum: PaymentStatus })
  status!: PaymentStatus;

  @prop({ required: true })
  orderId!: Ref<Order>;

  @prop({ required: false })
  reference: string;

  @prop({ required: false, ref: () => File })
  file: Ref<File>;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
