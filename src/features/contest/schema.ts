import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';
import { File } from '../file/schema';

@plugin(mongooseIdValidator)
@pre<Contest>('save', function (next) {
  if (this.startDate > this.endDate) {
    next(new Error('Start date cannot be greater than end date'));
  }
  if (this.topUsers > this.winnersPrize.length) {
    next(new Error('Top users cannot be greater than winners prize'));
  }

  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class Contest {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: true })
  name!: string;

  @prop({ required: false, ref: () => File })
  image!: Ref<File>;

  @prop({
    required: true,
    min: [
      Date.now().toString(),
      "Start date must be greater than today's date",
    ],
    type: () => Date,
  })
  startDate!: Date;

  @prop({ required: true, type: () => Date })
  endDate!: Date;

  @prop({ required: true })
  entryFee!: number;

  @prop({ required: true })
  topUsers!: number;

  @prop({ required: true })
  description!: string;

  @prop({ required: true })
  winnersPrize!: number[];

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
