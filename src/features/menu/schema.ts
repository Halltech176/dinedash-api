import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { Category } from '../category/schema';
import { File } from '../file/schema';

@plugin(mongooseIdValidator)
@pre<Menu>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class Menu {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: true })
  name: string;

  @prop({ required: true })
  description: string;

  @prop({ required: true })
  price: number;

  @prop({ required: true, ref: 'File' })
  image: Ref<File>;

  @prop({ required: true, ref: 'Category' })
  category: Ref<Category>;

  @prop({ required: true })
  ingredients: Array<string>;

  @prop({ required: false })
  tags: Array<string>;
  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
