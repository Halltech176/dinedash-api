import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { Menu } from '../menu/schema';

@plugin(mongooseIdValidator)
@pre<Review>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class Review {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: true })
  comment: string;

  @prop({ required: true, min: 1, max: 5 })
  rating: number;

  @prop({ required: true, ref: 'Menu' })
  menuId: Ref<Menu>;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
