import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';

@plugin(mongooseIdValidator)
@pre<QuizZone>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class QuizZone {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
