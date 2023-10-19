import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { Category } from '../category/schema';

export enum FunAndLearnStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@plugin(mongooseIdValidator)
@pre<FunAndLearn>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class FunAndLearn {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: true, ref: () => Category })
  category: Ref<Category>;

  @prop({ required: true, ref: () => Category })
  subCategory: Ref<Category>;

  @prop({ required: true })
  title!: string;

  @prop({ required: true })
  description!: string;

  @prop({ required: false, default: 'English' })
  language?: string;

  @prop({ required: false, default: 'inactive', enum: FunAndLearnStatus })
  status?: string;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
