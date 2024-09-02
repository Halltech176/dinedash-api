import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { Menu } from '../menu/schema';

@plugin(mongooseIdValidator)
@pre<Cart>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class Cart {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: true })
  items!: Array<{ menuId: Ref<Menu>; quantity: number }>;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
