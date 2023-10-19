import { prop, plugin, pre, modelOptions, Ref } from '@typegoose/typegoose';
import mongooseIdValidator from 'mongoose-id-validator2';
import { User } from '../../models/userModel';

@plugin(mongooseIdValidator)
@pre<ContestQuestions>('save', function (next) {
  // this.record = doc.name + '-' + doc.createdBy;
  next();
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { automaticName: true },
})
export class ContestQuestions {
  @prop({ required: true, immutable: true, ref: () => User })
  public createdBy!: Ref<User>;

  @prop({ required: true, ref: () => ContestQuestions })
  typeId: Ref<ContestQuestions>;

  @prop({ required: true })
  question!: string;

  @prop({ required: true, default: [] })
  options!: Array<number | string>;

  @prop({
    required: true,
    min: 1,
  })
  correctOptionIndex: number;

  @prop({ required: true, default: 10 })
  points?: number;

  @prop({ required: true })
  answerDescription!: string;

  // @prop({ required: true, immutable: true, unique: true })
  // public record!: string;
}
