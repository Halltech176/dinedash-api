import { IsOptional, IsString } from 'class-validator';
import { Notification } from './schema';
import { IDocs } from '../../utilities/templates/types';

const doc: IDocs = {};

export class CreateNotificationDto
  implements Omit<Required<Notification>, 'createdBy' | 'isRead' | 'type'>
{
  @IsString()
  message: string;
}

doc['/'] = {
  POST: {
    schema: CreateNotificationDto.name,
  },
};

export class UpdateNotificationDto implements Omit<CreateNotificationDto, ''> {
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
