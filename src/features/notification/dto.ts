import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { Notification } from './schema';
import { IDocs } from '../../utilities/templates/types';
import { Ref } from '@typegoose/typegoose';
import { User } from '../../models/userModel';

const doc: IDocs = {};

export class CreateNotificationDto
  implements Omit<Required<Notification>, 'createdBy' | 'isRead'>
{
  @IsString()
  message: string;

  @IsMongoId()
  userId: Ref<User> | undefined;

  @IsString()
  type: string;
}

doc['/'] = {
  POST: {
    schema: CreateNotificationDto.name,
  },
};

export class UpdateNotificationDto
  implements Omit<CreateNotificationDto, 'userId'>
{
  @IsOptional()
  message: string;

  @IsOptional()
  isRead: boolean;

  @IsOptional()
  type: string;
}

doc['/:id'] = {
  PUT: {
    schema: UpdateNotificationDto.name,
  },
};

export const docs = doc;
