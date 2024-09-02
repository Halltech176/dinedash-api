import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';

@plugin(mongooseIdValidator)
@pre<Notification>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class Notification {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: true })
  message!: string;

  @prop({ required: true, default: false })
  isRead!: boolean;

  @prop({ required: true })
  type!: string;

  @prop({ required: true, ref: () => User })
  userId: Ref<User> | undefined;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
